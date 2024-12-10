import { ICategory } from "../../interface/ICategory.js";
import mongoose from "mongoose";
import { IProduct } from "../../interface/IProduct.js";
export default class UserRepository {
    findCategory: () => Promise<ICategory[] | null>;
    findProducts: (categoryId: mongoose.Types.ObjectId) => Promise<IProduct[] | null>;
}
