const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair, verifyJWT } = require("../auth/authUtils");
const { getInfoData } = require("../utils");
const {
  BadRequestError,
  AuthFailureError,
  ForbiddenError,
} = require("../core/error.response");
const { findByEmail } = require("./shop.service");

const ROLE_SHOP = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};

class AccessService {
  static login = async ({ email, password, refreshToken = null }) => {
    const shop = await findByEmail({ email });
    if (!shop) {
      throw new BadRequestError("Shop not found!");
    }

    const match = bcrypt.compare(password, shop.password);
    if (!match) {
      throw new AuthFailureError("Authentication error!");
    }

    const privateKey = crypto.randomBytes(64).toString("hex");
    const publicKey = crypto.randomBytes(64).toString("hex");

    const tokens = await createTokenPair(
      {
        userId: shop._id,
        email,
      },
      publicKey,
      privateKey
    );

    await KeyTokenService.createKeyToken({
      refreshToken: tokens.refreshToken,
      privateKey,
      publicKey,
      userId: shop._id,
    });

    return {
      shop: getInfoData({
        fileds: ["_id", "name", "email"],
        object: shop,
      }),
      tokens,
    };
  };

  static signUp = async ({ name, email, password }) => {
    try {
      const shop = await shopModel.findOne({ email }).lean();

      if (shop) {
        throw new BadRequestError("Error: Shop already registered!");
      }

      const passwordHash = (await bcrypt.hash(password, 10)).toString();
      const newShop = await shopModel.create({
        name,
        email,
        password: passwordHash,
        roles: [ROLE_SHOP.SHOP],
      });

      if (newShop) {
        // const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
        //   modulusLength: 4096,
        //   publicKeyEncoding: {
        //     type: "pkcs1",
        //     format: "pem",
        //   },
        //   privateKeyEncoding: {
        //     type: "pkcs1",
        //     format: "pem",
        //   },
        // });

        const privateKey = crypto.randomBytes(64).toString("hex");
        const publicKey = crypto.randomBytes(64).toString("hex");

        const keyStore = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
          privateKey,
        });

        if (!keyStore) {
          throw new BadRequestError("Error: keyStore!");
        }

        const tokens = await createTokenPair(
          {
            userId: newShop._id,
            email,
          },
          publicKey,
          privateKey
        );

        return {
          code: 201,
          metadata: {
            shop: getInfoData({
              fileds: ["_id", "name", "email"],
              object: newShop,
            }),
            tokens,
          },
          status: "success",
        };
      } else {
        return {
          code: 200,
          metadata: null,
          status: "success",
        };
      }
    } catch (error) {
      return {
        code: "xxx",
        message: error,
        status: "error",
      };
    }
  };

  static logout = async (keyStore) => {
    return await KeyTokenService.removeKeyById(keyStore._id);
  };

  static handlerRefershToken = async (refreshToken) => {
    const foundToken = await KeyTokenService.findByRefreshTokenUsed(
      refreshToken
    );
    if (foundToken) {
      const { userId, email } = await verifyJWT(
        refreshToken,
        foundToken.privateKey
      );
      console.error({ userId, email });
      await KeyTokenService.removeByUserId(userId);
      throw new ForbiddenError("Something wrong happen, pls login again!");
    } else {
      const holderToken = await KeyTokenService.findByRefreshToken(
        refreshToken
      );
      if (!holderToken) {
        throw new AuthFailureError("Shop not registered");
      }

      const { userId, email } = await verifyJWT(
        refreshToken,
        holderToken.privateKey
      );
      console.info({ userId, email });

      const foundShop = await findByEmail({ email });
      if (!foundShop) {
        throw new AuthFailureError("Shop not registered");
      }

      const tokens = await createTokenPair(
        {
          userId: foundShop._id,
          email,
        },
        holderToken.publicKey,
        holderToken.privateKey
      );

      await holderToken.updateOne({
        $set: {
          refreshToken: tokens.refreshToken,
        },
        $addToSet: {
          refreshTokensUsed: refreshToken,
        },
      });

      return {
        user: { userId, email },
        tokens,
      };
    }
  };
}

module.exports = AccessService;
