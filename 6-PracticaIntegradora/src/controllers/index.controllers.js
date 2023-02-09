import { productManager } from '../dao/services/productManager.service.js'
import { productService } from '../dao/services/product.service.js'

export const HandleIndex = async (req, res) => {
    await productService.getProducts().then(data => {
        res.status(data.status).render('home', {productos: data.data, title: 'Home'})
    })
}