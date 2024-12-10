import mongoose, { Types } from "mongoose";

export interface IProduct{
    _id:Types.ObjectId;
    productName:string;
    productPrice:number;
    productDescription:string;
    category:mongoose.Types.ObjectId; 
}