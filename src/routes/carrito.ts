import { Router } from "express";
import { Carrito } from "../business/Carrito";
import { carritosDaoMongoDb as carritosDao,  productosDaoMongoDb as productosDao } from "../daos";


const router = Router();
router.post('/new', async (req, res) => {
    try {
        const carrito = new Carrito();
        const newId = await carritosDao.save(carrito);
        return res.send({ ...carrito, id: newId });
    } catch (error) {
        return res.status(500).send({ error: 'Hubo un error al procesar la petición' })
    }
});
router.get('/:id/productos', async (req, res) => {
    try {
        const { id } = req.params;
        const carrito = await carritosDao.getById(id);
        return res.send(carrito.productos);
    } catch (error) {
        return res.status(500).send({ error: 'Hubo un error al procesar la petición' })
    }
});

router.post('/:id/productos', async (req, res) => {
    try {
        const { id } = req.params;
        const { id: idProducto } = req.body;
        const carrito = await carritosDao.getById(id);
        const producto = await productosDao.getById(idProducto);
        if (carrito.productos.filter(prod => prod.id == producto.id).length > 0) {
            carrito.productos.forEach(prod => {
                if (prod.id == producto.id) {
                    prod.quantity += 1;
                }
            })
        } else {
            const newProd = { ...producto };
            newProd.quantity = 1;
            carrito.productos = [...carrito.productos, newProd];
        }
        await carritosDao.updateById(id, carrito);

        return res.send({ id })
    } catch (error) {
        return res.status(500).send({ error: 'Hubo un error al procesar la petición' })
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await carritosDao.deleteById(id);
        return res.send({ id })
    } catch (error) {
        return res.status(500).send({ error: 'Hubo un error al procesar la petición' })
    }
});

router.delete('/:id/productos/:id_prod', async (req, res) => {
    try {
        const { id, id_prod } = req.params;
        const carrito = await carritosDao.getById(id);
        carrito.productos = carrito.productos.filter(prod => prod.id !== id_prod);
        await carritosDao.updateById(id, carrito);
        return res.send({ id })
    } catch (error) {
        return res.status(500).send({ error: 'Hubo un error al procesar la petición' })
    }
});

export default router;