import { cartService } from '../../dao/services/cart.service.js'

export const HandleRenderCarts = async (req, res) => {
  const result = await cartService.getAll()

  res.render('cart/table', { title: 'Carts', data: result.payload })
}

export const HandleRenderCartDetail = async (req, res) => {
  const { cid } = req.params

  const result = await cartService.getOne(cid)

  res.render('cart/detail', { title: 'Cart', data: result.payload.products })
}
