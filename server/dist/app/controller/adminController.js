import { StatusCode } from "../../interface/statusCode.js";
import AdminUseCase from "../../app/use-case/adminUseCase.js";
export default class AdminController {
    constructor() {
        this.addCategory = async (req, res) => {
            try {
                const categoryName = req.body.categoryName;
                const categoryTitle = req.body.categoryTitle;
                const files = req.files;
                if (!categoryName || !categoryTitle || !files || !files.images || files.images.length === 0) {
                    res.status(StatusCode.BadRequest).json({ message: "Credients are missing" });
                    return;
                }
                const imageBuffers = files.images.map((file) => file.buffer);
                const response = await this.adminUseCase.addCategory(categoryName, categoryTitle, imageBuffers);
                res.status(response.status).json({ message: response.message, data: response.category });
            }
            catch (error) {
                console.log("Error in adding categoried", error);
                res.status(StatusCode.InternalServerError).json({ message: "Internal server error" });
            }
        };
        this.getCategoried = async (req, res) => {
            try {
                const response = await this.adminUseCase.fetchCategorys();
                res.status(response.status).json({ message: response.message, data: response.data });
            }
            catch (error) {
                console.log("Error in fetching categories", error);
                res.status(StatusCode.InternalServerError).json({ message: "Internal server error" });
            }
        };
        this.addProducts = async (req, res) => {
            try {
                const productName = req.body.productName;
                const productPrice = req.body.productPrice;
                const productDescription = req.body.productDescription;
                const categoryId = req.body.category;
                if (!productName || !productDescription || !productPrice || !categoryId) {
                    res.status(StatusCode.BadRequest).json({ message: "Some credients are missing" });
                }
                const response = await this.adminUseCase.addProduct(productName, productPrice, productDescription, categoryId);
                res.status(response.status).json({ message: response.message, data: response.data });
            }
            catch (error) {
                console.log("Error in adding products", error);
                res.status(StatusCode.InternalServerError).json({ message: "Internal server error" });
            }
        };
        this.getProducts = async (req, res) => {
            try {
                const response = await this.adminUseCase.fetProducts();
                res.status(response.status).json({ message: response.message, data: response.data });
            }
            catch (error) {
                console.log("Error geting products", error);
                res.status(StatusCode.InternalServerError).json({ message: "Internal server error" });
            }
        };
        this.adminUseCase = new AdminUseCase();
    }
}
