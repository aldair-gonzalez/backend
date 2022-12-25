import fs from 'fs';

export class ProductManager {
    constructor( path ) {
        this.productos = [];
        this.path = path;
        this.id = 0;
    }

    async getProducts() {
        let productos = await fs.promises.readFile(this.path, 'utf-8');
        return JSON.parse(productos);
    }

    async getProductById( id ) {
        let productos = await this.getProducts();

        return new Promise((resolve, reject) => {
            let producto = productos.find(p => p.id === id);
            if(producto) {
                resolve(
                    producto
                )
            } else {
                reject('No se encontro el producto');
            }
        })
    }

    addProduct( {title, description, price, thumbnail, code, stock} ) {
        return new Promise(async (resolve, reject) => {
            if( title && description && price && thumbnail && code && stock ) {
                this.id++;
                const product = {
                    id: this.id,
                    title: title,
                    description: description,
                    price: price,
                    thumbnail: thumbnail,
                    code: code,
                    stock: stock
                }
                this.productos.push(product);
                await fs.promises.writeFile(this.path, JSON.stringify(this.productos, null, '\t'));
                resolve('Se añadió el producto de manera exitosa');
            } else {
                reject('Todos los compos son requeridos');
            }
        });
    }

    async updateProduct( id, producto ) {
        return new Promise(async (resolve, reject) => {
            let products = await this.getProducts();
            let productExist = await products.find(p => p.id == id);
    
            if(productExist) {
                productExist.title = producto.title || productExist.title;
                productExist.description = producto.description || productExist.description;
                productExist.price = producto.price || productExist.price;
                productExist.thumbnail = producto.thumbnail || productExist.thumbnail;
                productExist.code = producto.code || productExist.code;
                productExist.stock = producto.stock || productExist.stock;
    
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

                resolve('Producto modificado de forma exitosa');
            } else {
                reject('No se encontro el producto especificado');
            }
        });
    }

    async deleteProduct( id ) {
        return new Promise(async (resolve, reject) => {
            let productsApi = await this.getProducts();
            let productExist = productsApi.find(p => p.id == id);
            
            if(productExist) {
                let positionProducto = productsApi.indexOf(productExist);
                productsApi.splice(positionProducto, 1)
                await fs.promises.writeFile(this.path, JSON.stringify(productsApi, null, '\t'));
                resolve('Producto eliminado de forma exitosa');
            } else {
                reject('No se encontro el producto especificado');
            }
        });
    }
}