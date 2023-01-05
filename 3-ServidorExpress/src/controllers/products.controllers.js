import { ProductManager } from '../models/productManager.model.js'

const productManager = new ProductManager('src/db/db.json');

export const getProducts    = async (req, res) => {
    const { limit } = req.query;
    productManager.getProducts(limit).then(data => {
        res.send(data);
    }).catch(console.error);
}
export const getProductById = async (req, res) => {
    const { id } = req.params;
    productManager.getProductById(id).then(data => {
        res.send(data);
    }).catch(console.error);
}
export const addProduct     = async (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body;
    let product = { title, description, price, thumbnail, code, stock };

    productManager.addProduct(product).then(data => {
        res.send(data);
    }).catch(console.error);
}
export const updateProduct  = async (req, res) => {
    const { id } = req.params;
    const object = req.body;

    productManager.updateProduct(id, object).then(data => {
        res.send(data);
    }).catch(console.error);
}
export const deleteProduct  = async (req, res) => {
    const { id } = req.params;

    productManager.deleteProductById(id).then(data => {
        res.send(data);
    });
}