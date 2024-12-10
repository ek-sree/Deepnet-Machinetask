import categoryModel from "../../models/categoryModel.js";
import productModel from "../../models/productModel.js";
export default class UserRepository {
    constructor() {
        this.findCategory = async () => {
            try {
                const categories = await categoryModel.find();
                if (!categories) {
                    return null;
                }
                return categories;
            }
            catch (error) {
                console.log("Error fetching category", error);
                return null;
            }
        };
        this.findProducts = async (categoryId) => {
            try {
                const products = await productModel.find({ category: categoryId });
                if (!products) {
                    return null;
                }
                return products;
            }
            catch (error) {
                console.log("Error fetching products", error);
                return null;
            }
        };
    }
}
