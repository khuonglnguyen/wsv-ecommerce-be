const {
  product,
  clothing,
  electronic,
  furniture,
} = require("../models/product.model");
const { BadRequestError } = require("../core/error.response");

class ProductFactory {
  static productRegistry = {};
  static registerProductType(type, classRef) {
    ProductFactory.productRegistry[type] = classRef;
  }
  static async create(type, payload) {
    const productClass = ProductFactory.productRegistry[type];
    if (!productClass)
      throw new BadRequestError(`Invalid Product Type ${type}`);

    return new productClass(payload).create();
  }
}

class Product {
  constructor({
    product_name,
    product_thumb,
    product_description,
    product_price,
    product_quantity,
    product_type,
    product_shop,
    product_attributes,
  }) {
    this.product_name = product_name;
    this.product_thumb = product_thumb;
    this.product_description = product_description;
    this.product_price = product_price;
    this.product_quantity = product_quantity;
    this.product_type = product_type;
    this.product_shop = product_shop;
    this.product_attributes = product_attributes;
  }

  async create(product_id) {
    return await product.create({
      ...this,
      _id: product_id,
    });
  }
}

class Clothing extends Product {
  async create() {
    const newClothing = await clothing.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    });

    if (!newClothing) throw new BadRequestError("Create clothing failed");

    const newProduct = await super.create(newClothing._id);
    if (!newProduct) throw new BadRequestError("Create product failed");

    return newProduct;
  }
}

class Electronic extends Product {
  async create() {
    const newElectronic = await electronic.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    });
    if (!newElectronic) throw new BadRequestError("Create electronic failed");

    const newProduct = await super.create(newElectronic._id);
    if (!newProduct) throw new BadRequestError("Create product failed");

    return newProduct;
  }
}

class Furniture extends Product {
  async create() {
    const newFurniture = await furniture.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    });
    if (!newFurniture) throw new BadRequestError("Create furniture failed");

    const newProduct = await super.create(newFurniture._id);
    if (!newProduct) throw new BadRequestError("Create product failed");

    return newProduct;
  }
}

ProductFactory.registerProductType("Electronics", Electronic);
ProductFactory.registerProductType("Clothing", Clothing);
ProductFactory.registerProductType("Furnitures", Furniture);

module.exports = ProductFactory;
