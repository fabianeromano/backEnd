import express from "express";
import { engine } from "express-handlebars";
import { productsRepository } from "./src/db/productos.js";
import http from "http";
import { Server as IOServer } from "socket.io";
import { FileHandler } from "./src/utils/files.js";

const fileHandler = new FileHandler('./messages.txt');

const app = express();
const httpServer = http.createServer(app);
const io = new IOServer(httpServer);
const productos = [];
const messages = [];

app.engine("handlebars", engine());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "handlebars");
//app.set("view engine", "pug");
//app.set("view engine", "ejs");

app.set("views", "./src/views");
//app.set("views", "./src/pugviews");
//app.set("views", "./src/ejsviews");

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/message-center", (req, res) => {
  res.render("message-center");
});
/* 
app.post("/productos", (req, res) => {
  const { title, price, thumbnail } = req.body;
  productsRepository.save({ title, price, thumbnail });
  res.render("home");
}); */

app.get("/productos", (req, res) => {
  res.render("productos", { productos, tieneProductos: productos.length > 0 });
});
app.get("/messages", (req, res) => {
  res.render("messages", { messages, hasMessages: messages.length > 0  });
});

const PORT = process.env.PORT || 8080;

const server = httpServer.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

io.on("connection", (socket) => {
  console.log("Usuario conectado");

  socket.emit("productos", productos);
  socket.emit("messages", messages);

  socket.on("new-product", (data) => {
    productos.push(data);
    io.sockets.emit("productos", productos);
  });
  socket.on("new-message", (data) => {
    messages.push(data);
    fileHandler.save(data);
    io.sockets.emit("messages", messages);
  });
});
