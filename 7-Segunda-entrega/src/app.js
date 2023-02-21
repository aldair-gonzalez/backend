import express from "express"
import { engine } from "express-handlebars"
import path from "path"

import __dirname from './dirname.js'


/* ---------------------------------- */
/* ------- Importar Rutas Api ------- */
/* ---------------------------------- */
import RoutesHome     from './routes/home.routes.js'
import RoutesProducts from './routes/products.routes.js'
import RoutesCarts    from './routes/carts.routes.js'
import RoutesMessages from './routes/messages.routes.js'

/* ---------------------------------- */
/* ------ Importar Rutas Render ----- */
/* ---------------------------------- */
import RoutesViewsProducts from './routes/products.routes.views.js'
import RoutesViewsMessages from './routes/messages.routes.views.js'
import RoutesViewsCarts    from './routes/carts.router.views.js'

import RoutesRealtimeProducts from './routes/realTimeProducts.routes.js'


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(`${__dirname}/public`))
app.use(express.static(path.join(`${__dirname}/views`)))

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('views', `${__dirname}/views`)
app.set('view engine', '.hbs')



/* ---------------------------------- */
/* ------------ Rutas Api ----------- */
/* ---------------------------------- */
app.use('/api/products', RoutesProducts)
app.use('/api/carts',    RoutesCarts)
app.use('/api/messages', RoutesMessages)

/* ---------------------------------- */
/* ----------- Rutas Views ---------- */
/* ---------------------------------- */
app.get('/',         RoutesHome)
app.use('/products', RoutesViewsProducts)
app.use('/messages', RoutesViewsMessages)
app.use('/carts',    RoutesViewsCarts)

app.use('/realtimeproducts', RoutesRealtimeProducts)

app.use((req, res) => {
    res.status(404).send(`Error 404 \n Página no encontrada`)
})


export default app