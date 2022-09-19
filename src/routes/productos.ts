import { Router } from "express";
import { productoRepository } from "../persistence";
import { Producto } from "../business/Producto";

const router = Router();

router.get('/', async (req, res) => {
    try {
        const productos = await productoRepository.getAll();
        return res.send(productos);
    } catch (error) {
        return res.status(500).send({ error: 'Hubo un error al procesar la petición' })
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await productoRepository.getById(+id);
        return res.send(producto);
    } catch (error) {
        return res.status(500).send({ error: 'Hubo un error al procesar la petición' })
    }
});

router.post('/', async (req, res) => {
    try {
        const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
        const producto = new Producto(nombre, descripcion, codigo, foto, +precio, +stock);
        const id = await productoRepository.save(producto);
        producto.id = id;
        return res.send(producto)
    } catch (error) {
        return res.status(500).send({ error: 'Hubo un error al procesar la petición' })
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
        await productoRepository.updateById(+id, { nombre, descripcion, codigo, foto, precio, stock })
        return res.send({ id })
    } catch (error) {
        return res.status(500).send({ error: 'Hubo un error al procesar la petición' })
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await productoRepository.deleteById(+id);
        return res.send({ id })
    } catch (error) {
        return res.status(500).send({ error: 'Hubo un error al procesar la petición' })
    }
});

export default router;