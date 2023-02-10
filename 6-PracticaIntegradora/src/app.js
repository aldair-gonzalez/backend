import express from 'express'
import { engine } from 'express-handlebars'
import path from 'path'
import mongoose from 'mongoose'

import __dirname from './dirname.js'

import RoutesIndex              from './routes/index.routes.js'
import RoutesProducts           from './routes/products.routes.js'
import RoutesCarts              from './routes/carts.routes.js'
import RoutesMessages           from './routes/messages.routes.js'
import RoutesRealTimeMessages   from './routes/realtimeMessages.routes.js'
import RoutesRealTimeProducts   from './routes/realtimeproducts.routes.js'

const app = express();



app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(`${__dirname}/public`))
app.use(express.static(path.join(__dirname, 'views')))

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('views', __dirname + '/views')
app.set('view engine', '.hbs')


/* ---------------------------------- */
/* -------- Conexion a mongo -------- */
/* ---------------------------------- */
const connection = mongoose.connect('mongodb+srv://admin:12345@cluster1.glf5qjj.mongodb.net/ecommerce?retryWrites=true&w=majority')


/* ---------------------------------- */
/* -------------- Rutas ------------- */
/* ---------------------------------- */
app.use(RoutesIndex)
app.use('/api/products',     RoutesProducts)
app.use('/api/carts',        RoutesCarts)
app.use('/api/messages',     RoutesMessages)
app.use('/chat',             RoutesRealTimeMessages)
app.use('/realtimeproducts', RoutesRealTimeProducts)


app.use((req, res) => {
    res.status(404).send(`Error 404 \n Página no encontrada`)
})


export default app