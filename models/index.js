const mongoose= require("mongoose");
const {Schema}= mongoose;

const imageSchema={
    url: String,
    meta:String,
    isThumbnauil: Boolean
}

const sizeSchema= {
    sizes: [String],
    isSize: Boolean
}

const productSchema= {
    title: String,
    subtitle: String,
    description: String,
    images:{
        type: Object.Types.ObjectId,
        ref:'Image'
    },
    sizes:{
        type: Object.Types.ObjectId,
        ref:'Size'
    },
    mrp: Number,
    price: Number
}

const orderSchema={
    products: {
        type: Object.Types.ObjectId,
        ref: 'Product'
    },
    placedOn: Date
}

const userSchema= {
    name:String,
    email:String,
    username:String,
    password:String,
    orders: {
        type:Object.Types.ObjectId,
        ref: 'Product'
    },
    wishlist:{
        tyoe: Object.Types.ObjectId,
        ref: 'Product'
    }
}

const Image=mongoose.model('Image', imageSchema);
const Size= mongoose.model('Size',sizeSchema);
const Product= mongoose.model('Product', productSchema);
const Order= mongoose.model('Order', orderSchema);
const User= mongoose.model('User',userSchema);


module.exports({
    Image,
    Size,
    Product,
    Order,
    User
});