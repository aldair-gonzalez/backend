import express from 'express'

import RoutesIndex      from './routes/index.routes.js'
import RoutesProducts   from './routes/products.routes.js'
import RoutesCarts      from './routes/carts.routes.js'

const app = express();



app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(RoutesIndex)

app.use('/api/products',    RoutesProducts)
app.use('/api/carts',       RoutesCarts)


app.use((req, res) => {
    res.status(404).send(`Error 404 \n Página no encontrada`)
})


export default app