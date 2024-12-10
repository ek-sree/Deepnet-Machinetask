import categoryModel from "../../models/categoryModel.js";
import { ICategory } from "../../interface/ICategory.js";
import productModel from "../../models/productModel.js";
import mongoose from "mongoose";
import { IProduct } from "../../interface/IProduct.js";

export default class AdminRepository{
    
    createCategory = async (categoryName: string,categoryTitle:string, imageUrls:string[]): Promise<ICategory | null> => {
        try {
            
            const categoryUpperCase = categoryName.toUpperCase();
            const categoryTitleUpperCase = categoryTitle.toUpperCase();
    
            const existingCategory = await categoryModel.findOne({ categoryName: categoryUpperCase });
            
            if (existingCategory) {
                return null;
            }
    
            const newCategory = new categoryModel({ categoryName: categoryUpperCase,categoryTitle:categoryTitleUpperCase, categoryImage:imageUrls });
            await newCategory.save();
    
            return newCategory;
        } catch (error) {
            console.log("Error creating category", error);
            return null;
        }
    };  
    
    
    findCategories= async():Promise<ICategory[] |null>=>{
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

    createProduct=async(productName:string, productPrice:string, productDescription:string, cateoryId: mongoose.Types.ObjectId):Promise<IProduct | null>=>{
        try {
            const product = await productModel.findOne({productName});
            if(product){
                return null
            }            
            const newProducts = new productModel({
                productName,
                productPrice,
                productDescription,
                category:cateoryId
            })
            await newProducts.save()
            return newProducts;
        } catch (error) {
            console.log("Error adding products", error);
            return null;
        }
    }

    findProducts=async():Promise<IProduct[] | null>=>{
        try {
            const products = await productModel.find();
            if(!products){
                return null
            }
            return products
        } catch (error) {
            console.log("Error fetching products", error);
            return null;
        }
    }
}