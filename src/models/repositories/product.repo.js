const {
  product,
  clothing,
  electronic,
  furniture,
} = require("../../models/product.model");
const { Types } = require("mongoose");

const findAll = async ({ query, limit, skip }) => {
  return await product
    .find(query)
    .populate("product_shop", "name email -_id")
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean()
    .exec();
};

const publishProductByShop = async ({ product_shop, product_id }) => {
  const shop = await product.findOne({
    product_shop: new Types.ObjectId(product_shop),
    _id: new Types.ObjectId(product_id),
  });

  if (!shop) return false;

  (shop.isDraft = false), (shop.isPublish = true);
  const { modifiedCount } = await shop.updateOne(shop);
  return modifiedCount;
};

module.exports = {
  findAll,
  publishProductByShop,
};
