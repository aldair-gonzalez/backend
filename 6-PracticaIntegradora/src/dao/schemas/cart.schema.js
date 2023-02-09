import mongoose from "mongoose"

const cartCollection = 'carts'

const cartSchema = mongoose.Schema({
    products: [
        {
           _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]

})

export const cartModelSchema = mongoose.model(cartCollection, cartSchema)