import { sessionService } from '../../dao/services/session.service.js'
import { User } from '../../dao/models/user.model.js'


export const HandleSessionLogin = async (req, res) => {
    try {

        const { email, password } = req.body
        let user = {email, password}
        let response = await sessionService.findUser(user)
        if(response.payload.user) {
            const { _id, email, user_name } = response.payload.user
            req.session.user = {
                id: _id,
                email: email,
                user_name: user_name
            }
        }
        res.status(response.status).json(req.session)
        
    } catch (error) {
        res.status(400).send({ error })
    }
}

export const HandleSessionSignup = async (req, res) => {
    try {

        const { user_name, first_name, last_name, email, password, age } = req.body

        let user = new User(first_name, last_name, user_name, email, password, age)

        let response = await sessionService.registerUser(user)
        res.status(response.status).json(response)
        
    } catch (error) {
        res.status(400).send({ error })
    }
}

export const HandleSessionLogout = async (req, res) => {
    try {

        req.session.destroy(err => {
            if(!err) res.send('Se cerró la sesion')
            else res.send({status: 'No se pudo cerrar la sesion', body: err})
        })
        
    } catch (error) {
        req.status(400).send({ error })
    }
}