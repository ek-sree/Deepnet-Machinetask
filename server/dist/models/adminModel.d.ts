import mongoose, { Document, Types } from "mongoose";
export interface AdminInterface extends Document {
    _id: Types.ObjectId;
    email: string;
    password: string;
}
declare const adminModel: mongoose.Model<AdminInterface, {}, {}, {}, mongoose.Document<unknown, {}, AdminInterface> & AdminInterface & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default adminModel;
