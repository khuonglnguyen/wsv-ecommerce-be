const { CREATED, SuccessResponse } = require("../core/success.reponse");
const ProductService = require("../services/product.service");

class ProductController {
  create = async (req, res, next) => {
    new SuccessResponse({
      message: "Create product success",
      metadata: await ProductService.create(req.body.product_type, {
        ...req.body,
        product_shop: req.user.userId,
      }),
    }).send(res);
  };
}

module.exports = new ProductController();
