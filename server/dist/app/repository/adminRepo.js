import categoryModel from "../../models/categoryModel.js";
import productModel from "../../models/productModel.js";
export default class AdminRepository {
    constructor() {
        this.createCategory = async (categoryName, categoryTitle, imageUrls) => {
            try {
                const categoryUpperCase = categoryName.toUpperCase();
                const categoryTitleUpperCase = categoryTitle.toUpperCase();
                const existingCategory = await categoryModel.findOne({ categoryName: categoryUpperCase });
                if (existingCategory) {
                    return null;
                }
                const newCategory = new categoryModel({ categoryName: categoryUpperCase, categoryTitle: categoryTitleUpperCase, categoryImage: imageUrls });
                await newCategory.save();
                return newCategory;
            }
            catch (error) {
                console.log("Error creating category", error);
                return null;
            }
        };
        this.findCategories = async () => {
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
        this.createProduct = async (productName, productPrice, productDescription, cateoryId) => {
            try {
                const product = await productModel.findOne({ productName });
                if (product) {
                    return null;
                }
                const newProducts = new productModel({
                    productName,
                    productPrice,
                    productDescription,
                    category: cateoryId
                });
                await newProducts.save();
                return newProducts;
            }
            catch (error) {
                console.log("Error adding products", error);
                return null;
            }
        };
        this.findProducts = async () => {
            try {
                const products = await productModel.find();
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
