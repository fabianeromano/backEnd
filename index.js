import express from "express";
import { engine } from "express-handlebars";
import { productsRepository } from "./src/db/productos.js";

const app = express();

app.engine("handlebars", engine());
app.use(express.urlencoded({extended: true}))
app.set("view engine", "handlebars");
//app.set("view engine", "pug");
//app.set("view engine", "ejs");

app.set("views", "./src/views");
//app.set("views", "./src/pugviews");
//app.set("views", "./src/ejsviews");

app.get("/", (req, res) => {
  res.render("home");
});
app.post("/productos", (req, res) => {
  const { title, price, thumbnail } = req.body;
  productsRepository.save({ title, price, thumbnail });
  res.render("home");
});
app.get("/productos", (req, res) => {
  const productos = productsRepository.getAll();
  res.render("productos", { productos, tieneProductos: productos.length > 0 });
});

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
