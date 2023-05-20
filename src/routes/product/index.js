const express = require("express");
const productController = require("../../controllers/product.controller");
const { asyncHandler } = require("../../helpers/asyncHandle");
const { authenticationV2 } = require("../../auth/authUtils");
const router = express.Router();

router.get("/search/:keySearch", asyncHandler(productController.searchProduct));
router.get("", asyncHandler(productController.findAllProducts));
router.get("/:id", asyncHandler(productController.findById));

// authentication
router.use(authenticationV2);
router.post("", asyncHandler(productController.create));
router.patch("/:productId", asyncHandler(productController.update));
router.post("/publish/:id", asyncHandler(productController.publishProductByShop));
router.post("/unpublish/:id", asyncHandler(productController.unPublishProductByShop));

// QUERY //
router.get("/drafts/all", asyncHandler(productController.getAllDraftForShop));
router.get(
  "/published/all",
  asyncHandler(productController.getAllPublishForShop)
);

module.exports = router;
