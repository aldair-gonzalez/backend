import { serverConection } from './utils/socket.utils.js'
import app from './app.js'

import { PORT } from './config/config.js'

const server = app.listen(PORT, err => err ? console.error(err) : console.log(`Servidor escuchando en http://localhost:${PORT}/`))

serverConection(server)