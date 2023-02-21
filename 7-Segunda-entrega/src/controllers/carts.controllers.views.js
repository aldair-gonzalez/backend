import { cartService } from '../dao/services/cart.service.js'

export const HandleRenderCarts = async (req, res) => {
    let resultado = await cartService.getCarts()

    res.render('carts', { title: 'Carritos de compra', carritos: resultado.payload })
}

export const HandleRenderProductsCart = async (req, res) => {
    const { cid } = req.params
    
    let resultado = await cartService.getProductsCart(cid)

    console.log(resultado.payload)
    res.render('products-cart', { title: 'Carrito', products: resultado.payload })
}