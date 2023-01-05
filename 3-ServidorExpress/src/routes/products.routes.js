import { Router } from 'express';

import { getProducts, addProduct, updateProduct, deleteProduct, getProductById } from '../controllers/products.controllers.js';

const router = Router();


router.get('/products',         getProducts);
router.get('/products/:id',     getProductById);
router.post('/products',        addProduct);
router.put('/products/:id',     updateProduct);
router.delete('/products/:id',  deleteProduct);


export default router;