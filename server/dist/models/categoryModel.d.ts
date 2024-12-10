import mongoose, { Document, Types } from "mongoose";
export interface SellerInterface extends Document {
    _id: Types.ObjectId;
    categoryName: string;
    categoryTitle: string;
    categoryImage: string[];
    isStatus: boolean;
}
declare const categoryModel: mongoose.Model<SellerInterface, {}, {}, {}, mongoose.Document<unknown, {}, SellerInterface> & SellerInterface & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default categoryModel;
