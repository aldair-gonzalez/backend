import { ProductManager } from './models/ProductManager.model.js';
const productsModel = new ProductManager('./db/api.json');

(async() => {
    // Productos
    let productosArray = [
        { title: 'producto 1', description: 'descripcion del producto 1', price: 100, thumbnail: 'url', code: 'code', stock: 12 },
        { title: 'producto 2', description: 'descripcion del producto 2', price: 100, thumbnail: 'url', code: 'code', stock: 12 },
        { title: 'producto 3', description: 'descripcion del producto 3', price: 100, thumbnail: 'url', code: 'code', stock: 12 },
    ]

    // Guardar cada producto en memoria
    productosArray.forEach(async (p) => {
        await productsModel.addProduct(p).then(console.log).catch(console.error);
    })

    // Obtener todos los productos
    console.log('-------------------------------------');
    console.log('------ Productos en inventario ------');
    console.log('-------------------------------------');
    let productos = await productsModel.getProducts().then().catch(console.error);
    console.log(productos);

    // Obtener un producto por id
    console.log('-------------------------------------');
    console.log('---------- Producto por id ----------');
    console.log('-------------------------------------');
    let producto = await productsModel.getProductById(3).then().catch(console.error);
    console.log(producto);

    // Modificar producto por id
    console.log('-------------------------------------');
    console.log('----- Modificar producto por id -----');
    console.log('-------------------------------------');
    let productUpdate = await productsModel.updateProduct(3,{title: 'Nuevo nombre'}).then().catch(console.error);
    console.log(productUpdate);

    // Eliminar producto por id
    console.log('-------------------------------------');
    console.log('------ Eliminar producto por id -----');
    console.log('-------------------------------------');
    let productDelete = await productsModel.deleteProduct(1).then().catch(console.error);
    console.log(productDelete);

    // Obtener todos los productos
    console.log('-------------------------------------');
    console.log('------ Productos en inventario ------');
    console.log('-------------------------------------');
    await productsModel.getProducts().then(console.log).catch(console.error);
})()