const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const ROLE_SHOP = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};

class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      const shop = await shopModel.findOne({ email }).lean();
      if (shop) {
        return {
          code: "xxx",
          message: "Shop realdy registered",
          status: "error",
        };
      }

      const passwordHash = (await bcrypt.hash(password, 10)).toString();
      const newShop = await shopModel.create({
        name,
        email,
        password: passwordHash,
        roles: [ROLE_SHOP.SHOP],
      });
      if (newShop) {
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
        });
      }
    } catch (error) {
      return {
        code: "xxx",
        message: error,
        status: "error",
      };
    }
  };
}

module.exports = AccessService;
