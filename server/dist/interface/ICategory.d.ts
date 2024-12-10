import { Types } from "mongoose";
export interface ICategory {
    _id: Types.ObjectId;
    categoryName: string;
    categoryTitle: string;
    categoryImage: string[];
}
