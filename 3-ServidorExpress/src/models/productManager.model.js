import fs, { read } from 'fs';

import { Product } from './product.model.js';

export class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async getProducts(limit) {
        let readfile = await this.getFile();
        if(limit) return JSON.parse(readfile).splice(0, limit);
        return JSON.parse(readfile);
    }
    
    async getProductById(id) {
        let readfile = await this.getFile();
        let exist = JSON.parse(readfile).find(d => d.id == id);
        if(exist) return exist;
        else return 'No se encontró el producto expecificado';
    }

    async addProduct(object) {
        let readfile = await this.getFile();
        let id = JSON.parse(readfile).length + 1;
        let products = [...JSON.parse(readfile)];
        let exist = products.find(product => product.code == object.code);
        
        if(
            object.title &&
            object.description &&
            object.price &&
            object.thumbnail &&
            object.code &&
            object.stock
        ) {
            if(!exist) {
                const product = new Product( id, object.title, object.description, object.price, object.thumbnail, object.code, object.stock );
                products.push(product);
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
                return `El producto ${product.title} con precio: $${product.price} y código: ${product.code} a sido añadido de forma exitosa`;
            } else return `Error. \n Ya existe un producto con el código: ${object.code}`;
        } else return 'Todos los campos son requeridos';
    }

    async updateProduct(id, object) {
        let readfile = await this.getFile();
        let products = [...JSON.parse(readfile)];
        let exist = products.find(product => product.id == id);

        if(id, object) {
            if(exist) {
                exist.title = object.title || exist.title;
                exist.description = object.description || exist.description;
                exist.price = object.price || exist.price;
                exist.thumbnail = object.thumbnail || exist.thumbnail;
                exist.code = object.code || exist.code;
                exist.stock = object.stock || exist.stock;
    
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
                return `Producto modificado de manera exitosa`;
            } else return 'No se encontró el producto expecificado';
        } else return 'Faltan compos por llenar';
    }

    async deleteProductById(id) {
        let readfile = await this.getFile();
        let products = [...JSON.parse(readfile)];
        let exist = products.find(product => product.id == id);

        if(exist) {
            let positionProduct = products.indexOf(exist);
            products.splice(positionProduct, 1)
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            return `Se eliminó el producto ${exist.title} de manera exitosa`;
        } else return 'No se encontró el producto expecificado';
    }

    async getFile() {
        let exist = fs.existsSync(this.path);
        if(!exist) await fs.promises.writeFile(this.path, '[]')
        let readfile = await fs.promises.readFile(this.path, 'utf-8');
        return readfile;
    }

}