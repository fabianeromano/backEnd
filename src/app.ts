import express from "express";
const cors = require('cors')
import { authenticated, notAuthorized, notImplemented } from "./middleware";
import { carritoRoutes, productosRoutes } from "./routes";

export const app = express();
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use(authenticated);
app.use(notAuthorized);
app.use(cors())

app.use('/carrito', carritoRoutes);
app.use('/productos', productosRoutes);
app.get('*', notImplemented);