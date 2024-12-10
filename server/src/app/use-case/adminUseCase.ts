import { StatusCode } from "../../interface/statusCode.js";
import AdminRepository from "../../app/repository/adminRepo.js";
import { uploadImageToCloudinary } from "../../services/cloudinary.js";
import { ICategory } from "../../interface/ICategory.js";
import mongoose from "mongoose";
import { IProduct } from "../../interface/IProduct.js";

const adminRepo = new AdminRepository()

export default class AdminUseCase{

    addCategory =async(categoryName:string, categoryTitle:string, images:Buffer[]):Promise<{status:number, message:string, category?:ICategory}> =>{
        try {

            const imageUrls = await Promise.all(
                images.map(async (imageBuffer) => {
                  const uploadResponse = await uploadImageToCloudinary(imageBuffer);
                  return uploadResponse.secure_url;
                })
              );            
              if(!imageUrls){
                return{status:StatusCode.InternalServerError as number, message:"Cant upload images"}
              }

      const category = await adminRepo.createCategory(categoryName,categoryTitle,imageUrls)
      if (!category) {
        return { status: StatusCode.Unauthorized as number, message: "cant add category,category already exist!" };
      }
      return { status: StatusCode.Created as number, message: "category added successfully" ,category };
        } catch (error) {
            console.log("Error add category in use-case",error);
            return{status :StatusCode.InternalServerError as number, message:'Internal server error'}   
        }
    }

    fetchCategorys = async():Promise<{status:number, message:string, data?:ICategory[]}>=>{
        try {
            const categories = await adminRepo.findCategories();
            if(!categories){
                return {status:StatusCode.NoContent as number, message:"No categories found"}
            }
            return {status:StatusCode.OK as number, message:"Categories fetched successfully", data:categories}
        } catch (error) {
            console.log("Error fetching category in use-case",error);
            return{status :StatusCode.InternalServerError as number, message:'Internal server error'}   
        }
    }


    addProduct= async(productName:string, productPrice:string, productDescription:string, cateoryId: mongoose.Types.ObjectId): Promise<{status:number, message:string,data?:IProduct}>=>{
        try {
            const products = await adminRepo.createProduct(productName,productPrice,productDescription,cateoryId);
            if(!products){
                return{status:StatusCode.BadRequest as number , message:`${productName} is already exist`}
            }
            return{status:StatusCode.Created as number, message:"Product created", data:products}
        } catch (error) {
            console.log("Error adding products in use-case",error);
            return{status :StatusCode.InternalServerError as number, message:'Internal server error'}   
        }
    }

    fetProducts = async(): Promise<{status:number, message:string, data?: IProduct[]}>=>{
        try {
            const products = await adminRepo.findProducts();
            if(!products){
                return{status:StatusCode.NoContent as number, message:"No products found"}
            }
            return {status:StatusCode.OK as number, message:"Product found", data:products}
        } catch (error) {
            console.log("Error fetching products in use-case",error);
            return{status :StatusCode.InternalServerError as number, message:'Internal server error'}   
        }
    }
}