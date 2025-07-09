import axios from "axios";

const PORT = 3002;
const BASE_API_URL = `http://localhost:${PORT}/api/v1`;

export async function getAllProducts(){
    try{
        const allProducts = await axios.get(`${BASE_API_URL}/products`);
        return allProducts.data;
    }
    catch(error){
        console.log(error);
        throw new Error(error);
    }
}

export async function getAProductsInfo(productId){
    try{
        const product = await axios.get(`${BASE_API_URL}/products/${productId}`);
        return product.data;
    }
    catch(error){
        console.log(error);
        throw new Error(error);
    }
}
