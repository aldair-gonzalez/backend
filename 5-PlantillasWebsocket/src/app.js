import express from 'express'
import handlebars, { engine } from 'express-handlebars'
import path from 'path'

import __dirname from './dirname.js'

import RoutesIndex              from './routes/index.routes.js'
import RoutesProducts           from './routes/products.routes.js'
import RoutesCarts              from './routes/carts.routes.js'
import RoutesRealTimeProducts   from './routes/realtimeproducts.routes.js'

const app = express();



app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(`${__dirname}/public`))
app.use(express.static(path.join(__dirname, 'views')))

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('views', __dirname + '/views')
app.set('view engine', '.hbs')


app.use(RoutesIndex)
app.use('/api/products',     RoutesProducts)
app.use('/api/carts',        RoutesCarts)
app.use('/realtimeproducts', RoutesRealTimeProducts)


app.use((req, res) => {
    res.status(404).send(`Error 404 \n Página no encontrada`)
})


export default app