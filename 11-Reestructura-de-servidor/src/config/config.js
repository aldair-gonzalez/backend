import { config } from 'dotenv'
config()

export const SERVER_PORT = process.env.SERVER_PORT || 8080

export const MONGOOSE_URL = process.env.MONGOOSE_URL || 'null'
export const MONGOOSE_DB_NAME = process.env.MONGOOSE_DB_NAME || 'err'
export const MONGOOSE_DB_COLLECTION_USERS = process.env.MONGOOSE_DB_COLLECTION_USERS || 'userserr'
export const MONGOOSE_DB_COLLECTION_PRODUCTS = process.env.MONGOOSE_DB_COLLECTION_PRODUCTS || 'productserr'
export const MONGOOSE_DB_COLLECTION_CARTS = process.env.MONGOOSE_DB_COLLECTION_CARTS || 'cartserr'

export const PASSPORT_GITHUB_CLIENTID = process.env.PASSPORT_GITHUB_CLIENTID || 'clientIderr'
export const PASSPORT_GITHUB_CLIENTSECRET = process.env.PASSPORT_GITHUB_CLIENTSECRET || 'clientSecreterr'
export const PASSPORT_GITHUB_CALLBACKURL = process.env.PASSPORT_GITHUB_CALLBACKURL || 'callbackUrlerr'

export const JWT_SESSION_SECRET = process.env.JWT_SESSION_SECRET || 'secreterr'
