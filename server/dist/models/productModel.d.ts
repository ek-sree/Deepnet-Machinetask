import mongoose, { Document, Types } from "mongoose";
export interface ProductInterface extends Document {
    _id: Types.ObjectId;
    productName: string;
    productPrice: number;
    productDescription: string;
    category: mongoose.Types.ObjectId;
    isStatus: boolean;
}
declare const productModel: mongoose.Model<ProductInterface, {}, {}, {}, mongoose.Document<unknown, {}, ProductInterface> & ProductInterface & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default productModel;
