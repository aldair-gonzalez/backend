import { Server } from "socket.io"

export const serverConection = ( server ) => {
    let io = new Server(server)

    io.on('connection', socket => {
        console.log('Cliente conectado')
        socket.emit('get-products', 'Obtener productos')
        socket.emit('get-messages', 'Obtener mensajes')
    })
}