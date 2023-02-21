import { config } from "dotenv"
config()

export const PORT = process.env.PORT || 3000
export const DB_NAME = process.env.DB_NAME || 'ecommerce'
export const DB_USER = process.env.DB_USER || 'admin'
export const DB_PASSWORD = process.env.DB_PASSWORD || '12345'
export const DB_COLLECTION_PRODUCTS = process.env.DB_COLLECTION_PRODUCTS || 'products'
export const DB_COLLECTION_CARTS = process.env.DB_COLLECTION_CARTS || 'carts'
export const DB_COLLECTION_MESSAGES = process.env.DB_COLLECTION_MESSAGES || 'messages'