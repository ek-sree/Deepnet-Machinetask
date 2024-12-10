import { StatusCode } from "../../interface/statusCode.js";
import AdminRepository from "../../app/repository/adminRepo.js";
import { uploadImageToCloudinary } from "../../services/cloudinary.js";
const adminRepo = new AdminRepository();
export default class AdminUseCase {
    constructor() {
        this.addCategory = async (categoryName, categoryTitle, images) => {
            try {
                const imageUrls = await Promise.all(images.map(async (imageBuffer) => {
                    const uploadResponse = await uploadImageToCloudinary(imageBuffer);
                    return uploadResponse.secure_url;
                }));
                if (!imageUrls) {
                    return { status: StatusCode.InternalServerError, message: "Cant upload images" };
                }
                const category = await adminRepo.createCategory(categoryName, categoryTitle, imageUrls);
                if (!category) {
                    return { status: StatusCode.Unauthorized, message: "cant add category,category already exist!" };
                }
                return { status: StatusCode.Created, message: "category added successfully", category };
            }
            catch (error) {
                console.log("Error add category in use-case", error);
                return { status: StatusCode.InternalServerError, message: 'Internal server error' };
            }
        };
        this.fetchCategorys = async () => {
            try {
                const categories = await adminRepo.findCategories();
                if (!categories) {
                    return { status: StatusCode.NoContent, message: "No categories found" };
                }
                return { status: StatusCode.OK, message: "Categories fetched successfully", data: categories };
            }
            catch (error) {
                console.log("Error fetching category in use-case", error);
                return { status: StatusCode.InternalServerError, message: 'Internal server error' };
            }
        };
        this.addProduct = async (productName, productPrice, productDescription, cateoryId) => {
            try {
                const products = await adminRepo.createProduct(productName, productPrice, productDescription, cateoryId);
                if (!products) {
                    return { status: StatusCode.BadRequest, message: `${productName} is already exist` };
                }
                return { status: StatusCode.Created, message: "Product created", data: products };
            }
            catch (error) {
                console.log("Error adding products in use-case", error);
                return { status: StatusCode.InternalServerError, message: 'Internal server error' };
            }
        };
        this.fetProducts = async () => {
            try {
                const products = await adminRepo.findProducts();
                if (!products) {
                    return { status: StatusCode.NoContent, message: "No products found" };
                }
                return { status: StatusCode.OK, message: "Product found", data: products };
            }
            catch (error) {
                console.log("Error fetching products in use-case", error);
                return { status: StatusCode.InternalServerError, message: 'Internal server error' };
            }
        };
    }
}
