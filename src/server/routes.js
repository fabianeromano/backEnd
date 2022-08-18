/*
Consigna: Realizar un proyecto de servidor basado en node.js y express que ofrezca una API RESTful de productos. En detalle, que incorpore las siguientes rutas:
GET '/api/productos' -> devuelve todos los productos.
GET '/api/productos/:id' -> devuelve un producto según su id.
POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
DELETE '/api/productos/:id' -> elimina un producto según su id.

{
    title: (nombre del producto),
    price: (precio),
    thumbnail: (url al logo o foto del producto)
}

Para el caso de que un producto no exista, se devolverá el objeto:
{ error : 'producto no encontrado' }
Implementar la API en una clase separada, utilizando un array como soporte de persistencia en memoria.
Incorporar el Router de express en la url base '/api/productos' y configurar todas las subrutas en base a este.
Crear un espacio público de servidor que contenga un documento index.html con un formulario de ingreso de productos con los datos apropiados.
El servidor debe estar basado en express y debe implementar los mensajes de conexión al puerto 8080 y en caso de error, representar la descripción del mismo.
Las respuestas del servidor serán en formato JSON. La funcionalidad será probada a través de Postman y del formulario de ingreso.


*/

const express = require('express');
const router = express.Router();
const productsRepository = require('./../db/productos');

// '/api/productos'
router.get('/', function(req, res) {
    try {
        const productos = productsRepository.getAll();
        return res.send(productos);
    } catch (error) {
        return res.status(404).send({error: "No se encontraron los productos"});
    }
});

router.get('/:id', function(req, res) {
    try {
        const id = req.params.id;
        const producto = productsRepository.getById(id);
        if(producto){
            return res.send(producto);
        } else {
            return res.status(404).send({ error : 'producto no encontrado' });
        }
    } catch (error) {
        return res.status(404).send({ error : 'producto no encontrado' });
    }
});

router.post('/', function(req, res) {
    try {
        const { title, price, thumbnail} = req.body;
        const producto = {
            title,
            price,
            thumbnail,
        }
        
        const id = productsRepository.save(producto);

        return res.send({id});
    } catch (error) {
        return res.status(404).send({error: "No se encontró el producto"});
    }
});

router.put('/:id', function(req, res) {
    try {
        const id = req.params.id;
        const { title, price, thumbnail } = req.body
        const data = {
            title,
            price,
            thumbnail
        }
        const producto = productsRepository.update(id, data);
        if(producto){
            return res.send(producto);
        } else {
            return res.status(404).send({error: "No se encontró el producto"});
        }
    } catch (error) {
        return res.status(404).send({error: "No se pudo actualizar el producto"});
    }
});

router.delete('/:id', function(req, res) {
    try {
        const id = req.params.id;
        productsRepository.deleteById(id);
        return res.send("Se eliminó el producto");
    } catch (error) {
        return res.status(404).send({error: "No se pudo eliminar el producto"});
    }
});

module.exports = router;