import { StatusCode } from "../../interface/statusCode.js";
import UserRepository from "../repository/userRepo.js";
const userRepo = new UserRepository();
export default class UserUseCase {
    constructor() {
        this.fetchCategorys = async () => {
            try {
                const categories = await userRepo.findCategory();
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
        this.fetchProducts = async (categoryId) => {
            try {
                const products = await userRepo.findProducts(categoryId);
                if (!products) {
                    return { status: StatusCode.NoContent, message: "No products available" };
                }
                return { status: StatusCode.OK, message: "Products found", data: products };
            }
            catch (error) {
                console.log("Error fetching products in use-case", error);
                return { status: StatusCode.InternalServerError, message: 'Internal server error' };
            }
        };
    }
}
