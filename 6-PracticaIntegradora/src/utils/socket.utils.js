import { Server } from "socket.io"

let io;

export const serverConection = ( server ) => {
    io = new Server(server)

    io.on('connection', socket => {
        console.log('Cliente conectado')
        socket.emit('get-products', 'Obtener productos')
    })
}