import { Types } from "mongoose";

export interface AdminData{
    _id:  Types.ObjectId
    email:string;
    password:string;
}