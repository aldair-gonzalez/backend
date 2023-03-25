import { productService } from '../../dao/services/product.service.js'

export const HandleRenderProducts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query

  const result = await productService.getAll(page, limit)

  res.render('product/table', { title: 'Products', data: result.payload })
}

export const HandleRenderProductDetail = async (req, res) => {
  const { pid } = req.params

  const result = await productService.getOne(pid)

  res.render('product/detail', { title: result.payload.title, product: result.payload })
}
