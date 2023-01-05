import express from 'express';

import RoutesIndex from './routes/index.routes.js';
import RoutesProducts from './routes/products.routes.js';

const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(RoutesIndex);
app.use(RoutesProducts);


app.use((req, res) => {
    res.status(404).send(`Error 404: Página no encontrada`);
});



export default app;