import fs from 'fs'

import { responseData, responseError } from '../../utils/response.js'
import { ProductCart } from '../patterns/productCart.pattern.js'
import { CartM } from '../patterns/cart.pattern.js'
import { productMemory } from './product.memory.js'

class CartMemory {
  constructor () {
    this.path = 'src/dao/db/carts.json'
  }

  async getAll () {
    try {
      const result = await this.getFile()
      return responseData(200, result)
    } catch (error) {
      return responseError(500, null, 'Internal Server Error')
    }
  }

  async getOne (cid) {
    try {
      const result = await this.getFile()
      const exist = await JSON.parse(result).find(element => parseInt(element._id) === parseInt(cid))
      if (!exist) return responseError(404, null, 'Cart not found')

      for (let i = 0; i < exist.products.length; i++) {
        const product = await productMemory.getOne(exist.products[i].product)
        exist.products[i].product = product.payload
      }
      return responseData(200, exist)
    } catch (error) {
      return responseError(500, null, 'Internal Server Error')
    }
  }

  async create () {
    try {
      const readfile = await this.getFile()
      const clone = await structuredClone(JSON.parse(readfile))
      const id = await clone.length + 1

      const cart = new CartM(id)
      await clone.push(cart)
      await fs.promises.writeFile(this.path, JSON.stringify(clone, null, '\t'))
      return responseData(201, cart)
    } catch (error) {
      return responseError(500, null, 'Internal Server Error')
    }
  }

  async update (cid, obj) {
    try {
      if (!(
        cid &&
        obj
      )) return responseError(400, null, 'All fields are required')
      const readfile = await this.getFile()
      const clone = await structuredClone(JSON.parse(readfile))

      const exist = await clone.find(e => parseInt(e._id) === parseInt(cid))
      if (!exist) return responseError(404, null, 'Cart not found')

      exist.products = await obj.products || exist.products

      await fs.promises.writeFile(this.path, JSON.stringify(clone, null, '\t'))

      return responseData(200, exist)
    } catch (error) {
      return responseError(500, null, 'Internal Server Error')
    }
  }

  async delete (cid) {
    try {
      const readfile = await this.getFile()
      const clone = await structuredClone(JSON.parse(readfile))

      const exist = await clone.find(e => parseInt(e._id) === parseInt(cid))
      if (!exist) return responseError(404, null, 'Cart Not found')

      const position = await clone.indexOf(exist)
      await clone.splice(position, 1)

      await fs.promises.writeFile(this.path, JSON.stringify(clone, null, '\t'))

      return responseData(200, { deletedCount: 1 })
    } catch (error) {
      return responseError(500, null, 'Internal Server Error')
    }
  }

  async productAdd (cid, pid) {
    try {
      const readfile = await this.getFile()
      const clone = await structuredClone(JSON.parse(readfile))

      const exist = await clone.find(e => parseInt(e._id) === parseInt(cid))
      if (!exist) return responseError(404, null, 'Cart not found')

      let existProduct = await exist.products.find(p => parseInt(p.product) === parseInt(pid))

      if (existProduct) {
        existProduct.quantity = await existProduct.quantity + 1
      } else {
        existProduct = new ProductCart(parseInt(pid))
        await exist.products.push(existProduct)
      }

      await fs.promises.writeFile(this.path, JSON.stringify(clone, null, '\t'))
      return responseData(200, exist)
    } catch (error) {
      return responseError(500, null, 'Internal Server Error')
    }
  }

  async productUpdate (cid, pid, obj) {
    try {
      const readfile = await this.getFile()
      const clone = await structuredClone(JSON.parse(readfile))

      const exist = await clone.find(e => parseInt(e._id) === parseInt(cid))
      if (!exist) return responseError(404, null, 'Cart not found')

      const existProduct = await exist.products.find(p => parseInt(p.product) === parseInt(pid))
      if (!existProduct) return responseError(404, null, 'Product not found')

      existProduct.quantity = await obj.quantity

      await fs.promises.writeFile(this.path, JSON.stringify(clone, null, '\t'))
      return responseData(200, existProduct)
    } catch (error) {
      return responseError(500, null, 'Internal Server Error')
    }
  }

  async productRemove (cid, pid) {
    try {
      const readfile = await this.getFile()
      const clone = await structuredClone(JSON.parse(readfile))

      const exist = await clone.find(e => parseInt(e._id) === parseInt(cid))
      if (!exist) return responseError(404, null, 'Cart not found')

      const existProduct = await exist.products.find(p => parseInt(p.product) === parseInt(pid))
      if (!existProduct) return responseError(404, null, 'Product not found')

      const position = await exist.products.findIndex(p => parseInt(p.product) === parseInt(pid))
      await exist.products.splice(position, 1)

      await fs.promises.writeFile(this.path, JSON.stringify(clone, null, '\t'))
      return responseData(200, { deletedCount: 1 })
    } catch (error) {
      return responseError(500, null, 'Internal Server Error')
    }
  }

  async getFile () {
    const exist = fs.existsSync(this.path)
    if (!exist) await fs.promises.writeFile(this.path, JSON.stringify([]))
    const readfile = await fs.promises.readFile(this.path, 'utf-8')
    if (readfile === '') await fs.promises.writeFile(this.path, JSON.stringify([]))
    return readfile
  }
}

export const cartMemory = new CartMemory()
