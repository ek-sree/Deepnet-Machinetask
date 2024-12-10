import { StatusCode } from "../../interface/statusCode.js";
import { ICategory } from "../../interface/ICategory.js";
import UserRepository from "../repository/userRepo.js";
import mongoose from "mongoose";
import { IProduct } from "../../interface/IProduct.js";

const userRepo = new UserRepository()

export default class UserUseCase{


    fetchCategorys = async():Promise<{status:number, message:string, data?:ICategory[]}>=>{
        try {
            const categories = await userRepo.findCategory();
            if(!categories){
                return {status:StatusCode.NoContent as number, message:"No categories found"}
            }
            return {status:StatusCode.OK as number, message:"Categories fetched successfully", data:categories}
        } catch (error) {
            console.log("Error fetching category in use-case",error);
            return{status :StatusCode.InternalServerError as number, message:'Internal server error'}   
        }
    }


    fetchProducts= async(categoryId: mongoose.Types.ObjectId): Promise<{status:number, message:string,data?:IProduct[]}>=>{
        try {
            const products = await userRepo.findProducts(categoryId);
            if(!products){
                return{status:StatusCode.NoContent as number, message:"No products available"}
            }
            return{status:StatusCode.OK as number, message:"Products found", data:products}
        } catch (error) {
            console.log("Error fetching products in use-case",error);
            return{status :StatusCode.InternalServerError as number, message:'Internal server error'}   
        }
    }

}