import { ICategory } from "../../interface/ICategory.js";
import mongoose from "mongoose";
import { IProduct } from "../../interface/IProduct.js";
export default class AdminUseCase {
    addCategory: (categoryName: string, categoryTitle: string, images: Buffer[]) => Promise<{
        status: number;
        message: string;
        category?: ICategory;
    }>;
    fetchCategorys: () => Promise<{
        status: number;
        message: string;
        data?: ICategory[];
    }>;
    addProduct: (productName: string, productPrice: string, productDescription: string, cateoryId: mongoose.Types.ObjectId) => Promise<{
        status: number;
        message: string;
        data?: IProduct;
    }>;
    fetProducts: () => Promise<{
        status: number;
        message: string;
        data?: IProduct[];
    }>;
}
