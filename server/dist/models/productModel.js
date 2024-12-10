import mongoose, { Schema } from "mongoose";
const ProductSchema = new Schema({
    productName: {
        type: String,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    productDescription: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    isStatus: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
});
const productModel = mongoose.model('Product', ProductSchema);
export default productModel;
