import { productManager } from '../services/productManager.service.js'

export const HandleIndex = async (req, res) => {
    await productManager.getProducts().then(data => {
        res.status(data.status).render('home', {productos: data.data, title: 'Home'})
    })
}