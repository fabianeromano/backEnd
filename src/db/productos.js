class ProductsRepository {
    constructor() {
        this.productos = []
    }
    
    save(producto) {
        try {
            const productos = this.getAll()
            let newId
            if (productos.length == 0) {
                newId = 1
            } else {
                const ultimoId = parseInt(productos[productos.length - 1].id)
                newId = ultimoId + 1;
            }

            this.productos.push({ ...producto, id: newId })

            return newId
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }
    getById(id) {
        try {
            const productos = this.getAll();
            const filtrarObjetos = productos.find((elem) => elem.id == id);
            const response = filtrarObjetos === undefined ? null : filtrarObjetos;
            return response;
        } catch (error) {
            throw new Error(`Error al buscar un producto por id: ${error}`);
        }
    }
    getAll() {
        try {
            return this.productos
        } catch (error) {
            return []
        }
    }
    update(id, data) {
        try {
            this.productos.forEach(producto => {
                if(producto.id == id){
                    producto.title = data.title;
                    producto.price = data.price;
                    producto.thumbnail = data.thumbnail;
                }
            })
            const updated = this.getById(id);
            return updated;
        } catch (error) {
            throw new Error(`Error al actualizar un producto por id: ${error}`);
        }
    }
    deleteById(id) {
        try {
            const productos = this.getAll();
            const nuevoDato = productos.filter((elem) => elem.id != id);
            if (nuevoDato.length === productos.length) {
                throw new Error(`Error while deleting. The id: ${id} was not found.`);
            }
            this.productos = nuevoDato;
        } catch (error) {
            throw new Error(`Error while deleting.`);
        }
    }
    deleteAll() {
        try {
            this.productos = [];
        } catch (error) {
            throw new Error(error);
        }
    }
}

const productsRepository = new ProductsRepository()

module.exports = productsRepository;