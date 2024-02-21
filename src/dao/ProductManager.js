const fs = require('fs');

class ProductManager {

    constructor(filePath) {
        if (!filePath || filePath.trim() === '') {
            // If filePath is empty or whitespace, use a default file path
            this.filePath = "./products.json"
            console.log(`No file path provided. Using default file path: ${this.filePath}`);
        } else {
            this.filePath = filePath;
        }
    }

    async readProductsFromDB() {
        try {
            const data = await fs.promises.readFile(this.filePath, {encoding:"utf-8"});
            return JSON.parse(data);
        } catch (error) {
            console.error("Error reading data:", error);
            return [];
        }
    }


    async getProducts(limit) {
        // traemos los products del archivo
        let products = await this.readProductsFromDB()

        if (limit > 0){
            products = products.slice(0, limit)
        }

        return products
    }

    async getProductById(id) {
        let products = await this.readProductsFromDB()

        let product = products.find(prod => prod.id === id)
        if (!product) {
            console.log(`Not Found`)
            return;
        }

        return product
    }


}

module.exports = ProductManager

// const app=async()=>{
//     let pm = new ProductManager()
//     let products  = await pm.getProducts()
//     console.log(products)
// }

// app()