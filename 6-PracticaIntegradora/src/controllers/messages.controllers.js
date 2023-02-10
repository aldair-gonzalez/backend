import { Message } from '../dao/models/message.model.js'
import { messageService } from '../dao/services/message.service.js'

export const HandleGetMessages = async (req, res) => {
    messageService.getMessages().then(data => {
        res.send(data)
    }).catch(console.error)
}

export const HandleNewMessage = async (req, res) => {
    const { user, message } = req.body
    const m = new Message(user, message)

    messageService.addMessage(m).then(data => {
        res.send(data)
    }).catch(console.error)
}