import express from "express";
import { productsRepository } from "./../db/productos";
export const router = express.Router();

// '/api/productos'
router.get("/", function (req, res) {
  try {
    const productos = productsRepository.getAll();
    return res.send(productos);
  } catch (error) {
    return res.status(404).send({ error: "No se encontraron los productos" });
  }
});

router.get("/:id", function (req, res) {
  try {
    const id = req.params.id;
    const producto = productsRepository.getById(id);
    if (producto) {
      return res.send(producto);
    } else {
      return res.status(404).send({ error: "producto no encontrado" });
    }
  } catch (error) {
    return res.status(404).send({ error: "producto no encontrado" });
  }
});

router.post("/", function (req, res) {
  try {
    const { title, price, thumbnail } = req.body;
    const producto = {
      title,
      price,
      thumbnail,
    };

    const id = productsRepository.save(producto);

    return res.send({ id });
  } catch (error) {
    return res.status(404).send({ error: "No se encontró el producto" });
  }
});

router.put("/:id", function (req, res) {
  try {
    const id = req.params.id;
    const { title, price, thumbnail } = req.body;
    const data = {
      title,
      price,
      thumbnail,
    };
    const producto = productsRepository.update(id, data);
    if (producto) {
      return res.send(producto);
    } else {
      return res.status(404).send({ error: "No se encontró el producto" });
    }
  } catch (error) {
    return res.status(404).send({ error: "No se pudo actualizar el producto" });
  }
});

router.delete("/:id", function (req, res) {
  try {
    const id = req.params.id;
    productsRepository.deleteById(id);
    return res.send("Se eliminó el producto");
  } catch (error) {
    return res.status(404).send({ error: "No se pudo eliminar el producto" });
  }
});
