import { StatusCode } from "../../interface/statusCode.js";
import UserUseCase from "../../app/use-case/userUseCase.js";
import mongoose from "mongoose";
export default class UserController {
    constructor() {
        this.getCategoried = async (req, res) => {
            try {
                const response = await this.userUseCase.fetchCategorys();
                res.status(response.status).json({ message: response.message, data: response.data });
            }
            catch (error) {
                console.log("Error in fetching categories", error);
                res.status(StatusCode.InternalServerError).json({ message: "Internal server error" });
            }
        };
        this.getPoroducts = async (req, res) => {
            try {
                const categoryId = req.query.categoryId;
                if (!categoryId) {
                    res.status(StatusCode.BadRequest).json({ message: "Id missing" });
                    return;
                }
                if (!mongoose.Types.ObjectId.isValid(categoryId)) {
                    res.status(StatusCode.BadRequest).json({ message: "Invalid category ID" });
                    return;
                }
                const objectId = new mongoose.Types.ObjectId(categoryId);
                const response = await this.userUseCase.fetchProducts(objectId);
                res.status(response.status).json({ message: response.message, data: response.data });
            }
            catch (error) {
                console.log("Error in fetching products", error);
                res.status(StatusCode.InternalServerError).json({ message: "Internal server error" });
            }
        };
        this.userUseCase = new UserUseCase();
    }
}
