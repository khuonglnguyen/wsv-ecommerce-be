const { CREATED, SuccessResponse } = require("../core/success.reponse");
const ProductService = require("../services/product.service");
const ProductServiceV2 = require("../services/product.service.v2");

class ProductController {
  create = async (req, res, next) => {
    new SuccessResponse({
      message: "Create product success",
      metadata: await ProductServiceV2.create(req.body.product_type, {
        ...req.body,
        product_shop: req.user.userId,
      }),
    }).send(res);
  };
}

module.exports = new ProductController();
