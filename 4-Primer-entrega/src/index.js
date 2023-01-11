import app from './app.js'
import { PORT } from './config/config.js'

app.listen(PORT, err => err ? console.error(err) : console.log(`Servidor escuchando en http://localhost:${PORT}/`))