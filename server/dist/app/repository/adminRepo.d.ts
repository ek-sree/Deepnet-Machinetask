import { ICategory } from "../../interface/ICategory.js";
import mongoose from "mongoose";
import { IProduct } from "../../interface/IProduct.js";
export default class AdminRepository {
    createCategory: (categoryName: string, categoryTitle: string, imageUrls: string[]) => Promise<ICategory | null>;
    findCategories: () => Promise<ICategory[] | null>;
    createProduct: (productName: string, productPrice: string, productDescription: string, cateoryId: mongoose.Types.ObjectId) => Promise<IProduct | null>;
    findProducts: () => Promise<IProduct[] | null>;
}
