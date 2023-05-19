const express = require("express");
const productController = require("../../controllers/product.controller");
const { asyncHandler } = require("../../helpers/asyncHandle");
const { authenticationV2 } = require("../../auth/authUtils");
const router = express.Router();

// authentication
router.use(authenticationV2);
router.post("", asyncHandler(productController.create));
router.post("/publish/:id", asyncHandler(productController.publishProductByShop));

// QUERY //
router.get("/drafts/all", asyncHandler(productController.getAllDraftForShop));
router.get(
  "/published/all",
  asyncHandler(productController.getAllPublishForShop)
);

module.exports = router;
