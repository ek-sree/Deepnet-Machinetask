export const BASE_URL = 'http://localhost:3000/api/admin/';

export const adminEndpoints = {
    getCategory: `${BASE_URL}/getAllCategories`,
    addCategory: `${BASE_URL}/addCategory`,
    addProducts: `${BASE_URL}/addProduct`,
    getProducts: `${BASE_URL}/getProducts`
}