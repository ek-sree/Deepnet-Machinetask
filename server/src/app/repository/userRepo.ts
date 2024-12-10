import categoryModel from "../../models/categoryModel.js";
import { ICategory } from "../../interface/ICategory.js";
import mongoose from "mongoose";
import { IProduct } from "../../interface/IProduct.js";
import productModel from "../../models/productModel.js";


export default class UserRepository{
    
    findCategory= async():Promise<ICategory[] |null>=>{
        try {
            const categories = await categoryModel.find();
            if(!categories){
                return null
            }
            return categories
        } catch (error) {
            console.log("Error fetching category", error);
            return null;
        }
    }


    findProducts=async(categoryId:mongoose.Types.ObjectId): Promise<IProduct[] | null>=>{
        try {
            const products = await productModel.find({category:categoryId});            
            if(!products){
                return null
            }
            return products;
        } catch (error) {
            console.log("Error fetching products", error);
            return null;
        }
    }
    
}