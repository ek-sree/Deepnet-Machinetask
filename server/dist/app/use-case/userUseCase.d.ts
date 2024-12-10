import { ICategory } from "../../interface/ICategory.js";
import mongoose from "mongoose";
import { IProduct } from "../../interface/IProduct.js";
export default class UserUseCase {
    fetchCategorys: () => Promise<{
        status: number;
        message: string;
        data?: ICategory[];
    }>;
    fetchProducts: (categoryId: mongoose.Types.ObjectId) => Promise<{
        status: number;
        message: string;
        data?: IProduct[];
    }>;
}
