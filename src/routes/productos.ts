import { Router } from "express";
import { productosDaoMongoDb as productosDao } from "../daos";
import { Producto } from "../business/Producto";

const router = Router();

router.get('/', async (req, res) => {
    try {
        const productos = await productosDao.getAll();
        return res.send(productos);
    } catch (error) {
        return res.status(500).send({ error: 'Hubo un error al procesar la petición' })
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await productosDao.getById(id);
        return res.send(producto);
    } catch (error) {
        return res.status(500).send({ error: 'Hubo un error al procesar la petición' })
    }
});

router.post('/', async (req, res) => {
    try {
        const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
        const producto = new Producto(nombre, descripcion, codigo, foto, +precio, +stock);
        const id = await productosDao.save(producto);
        return res.send(producto)
    } catch (error) {
        return res.status(500).send({ error: 'Hubo un error al procesar la petición' })
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
        await productosDao.updateById(id, { nombre, descripcion, codigo, foto, precio, stock })
        return res.send({ id })
    } catch (error) {
        return res.status(500).send({ error: 'Hubo un error al procesar la petición' })
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await productosDao.deleteById(id);
        return res.send({ id })
    } catch (error) {
        return res.status(500).send({ error: 'Hubo un error al procesar la petición' })
    }
});

export default router;