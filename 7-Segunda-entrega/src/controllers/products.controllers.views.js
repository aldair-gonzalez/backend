import { productService } from '../dao/services/product.service.js'

export const HandleRenderProducts = async (req, res) => {
    const { page = 1, limit = 10, status = '', category = '', sort } = req.query

    if (JSON.stringify(status) == 'true') status = true
    if (JSON.stringify(status) == 'false') status = false

    let resultado = await productService.getProducts(page, limit, status, category, sort)

    res.render('products', {title: 'Productos', data: resultado.payload})
}

export const HandleRenderProductDetail = async (req, res) => {
    let { pid } = req.params

    let product = await productService.getProductById(pid)

    res.render('product-detail', { title: product.payload.title, product: product.payload })
}