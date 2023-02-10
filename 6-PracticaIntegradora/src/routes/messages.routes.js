import { Router } from "express"
import { HandleGetMessages, HandleNewMessage } from '../controllers/messages.controllers.js'


const router = Router()

router.get('/',     HandleGetMessages)
router.post('/',    HandleNewMessage)


export default router