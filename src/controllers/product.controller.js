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

  update = async (req, res, next) => {
    new SuccessResponse({
      message: "Update product success",
      metadata: await ProductServiceV2.update(
        req.body.product_type,
        req.params.productId,
        {
          ...req.body,
          product_shop: req.user.userId,
        }
      ),
    }).send(res);
  };

  /**
   * @des Get all product draft
   * @param {Number} limit
   * @param {Number} skip
   * @return {JSON}
   */
  getAllDraftForShop = async (req, res, next) => {
    new SuccessResponse({
      message: "Get list product draft success",
      metadata: await ProductServiceV2.findAllDraftForShop({
        product_shop: req.user.userId,
      }),
    }).send(res);
  };

  /**
   * @des Get all product publish
   * @param {Number} limit
   * @param {Number} skip
   * @return {JSON}
   */
  getAllPublishForShop = async (req, res, next) => {
    new SuccessResponse({
      message: "Get list product publish success",
      metadata: await ProductServiceV2.findAllPublishForShop({
        product_shop: req.user.userId,
      }),
    }).send(res);
  };

  /**
   * @des publish
   * @param {Number} product_shop
   * @param {Number} product_id
   * @return {JSON}
   */
  publishProductByShop = async (req, res, next) => {
    new SuccessResponse({
      message: "Publish product success",
      metadata: await ProductServiceV2.publishProductByShop({
        product_shop: req.user.userId,
        product_id: req.params.id,
      }),
    }).send(res);
  };

  /**
   * @des unPublish
   * @param {Number} product_shop
   * @param {Number} product_id
   * @return {JSON}
   */
  unPublishProductByShop = async (req, res, next) => {
    new SuccessResponse({
      message: "Publish product success",
      metadata: await ProductServiceV2.unPublishProductByShop({
        product_shop: req.user.userId,
        product_id: req.params.id,
      }),
    }).send(res);
  };

  /**
   * @des Search product
   * @param {String} keySearch
   * @return {JSON}
   */
  searchProduct = async (req, res, next) => {
    new SuccessResponse({
      message: "Publish product success",
      metadata: await ProductServiceV2.searchProducts({
        keySearch: req.params.keySearch,
      }),
    }).send(res);
  };

  /**
   * @des Find all product
   * @param {String} keySearch
   * @return {JSON}
   */
  findAllProducts = async (req, res, next) => {
    new SuccessResponse({
      message: "Get All Product success",
      metadata: await ProductServiceV2.findAllProduct(req.query),
    }).send(res);
  };

  /**
   * @des Find product by id
   * @param {String} keySearch
   * @return {JSON}
   */
  findById = async (req, res, next) => {
    new SuccessResponse({
      message: "Get Product success",
      metadata: await ProductServiceV2.findProduct({
        product_id: req.params.id,
      }),
    }).send(res);
  };
}

module.exports = new ProductController();
