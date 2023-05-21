const { inventory } = require("../inventory.model");
const { Types } = require("mongoose");

const insert = async ({ productId, shopId, stock, location = "unknow" }) => {
  return await inventory.create({
    inven_productId: productId,
    inven_shopId: shopId,
    inven_location: location,
    inven_stock: stock,
  });
};

module.exports = { insert };
