import mongoose from "mongoose"

const messageCollection = 'messages'

const messageSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    messagge: {
        type: String,
        required: true
    }
})

export const messageModelSchema = mongoose.model(messageCollection, messageSchema)