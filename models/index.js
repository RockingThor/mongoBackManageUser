const mongoose = require("mongoose");
const { Schema } = mongoose;

const imageSchema = {
    url: String,
    meta: String,
    isThumbnauil: Boolean,
};

const sizeSchema = {
    sizes: [String],
    isSize: Boolean,
};

const productSchema = {
    title: String,
    subtitle: String,
    description: String,
    images: {
        type: Schema.Types.ObjectId,
        ref: "Image",
    },
    sizes: {
        type: Schema.Types.ObjectId,
        ref: "Size",
    },
    mrp: Number,
    price: Number,
};

const shoeSchema = {
    title: String,
    url: String,
    product_details: String,
    price: String,
    image_list: [String],
    features: [],
    breadcrumbs: String,
    brand: String,
    asin: String,
};

const orderSchema = {
    products: {
        type: Schema.Types.ObjectId,
        ref: "Product",
    },
    placedOn: Date,
};

const userSchema = {
    name: String,
    email: String,
    username: String,
    password: String,
    orders: {
        type: Schema.Types.ObjectId,
        ref: "Product",
    },
    wishlist: {
        type: Schema.Types.ObjectId,
        ref: "Product",
    },
};

const Image = mongoose.model("Image", imageSchema);
const Size = mongoose.model("Size", sizeSchema);
const Product = mongoose.model("Product", productSchema);
const Order = mongoose.model("Order", orderSchema);
const User = mongoose.model("User", userSchema);
const Shoe = mongoose.model("Shoe", shoeSchema);

module.exports = {
    Image,
    Size,
    Product,
    Order,
    User,
    Shoe,
};
