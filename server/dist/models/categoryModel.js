import mongoose, { Schema } from "mongoose";
const categorySchema = new Schema({
    categoryName: {
        type: String,
        required: true,
        trim: true,
        set: (name) => name.toUpperCase(),
    },
    categoryTitle: {
        type: String,
        required: true,
        set: (name) => name.toUpperCase(),
    },
    categoryImage: {
        type: [String],
        required: true,
    },
    isStatus: {
        type: Boolean,
        required: true,
        default: true
    }
}, {
    timestamps: true,
});
const categoryModel = mongoose.model('Category', categorySchema);
export default categoryModel;
