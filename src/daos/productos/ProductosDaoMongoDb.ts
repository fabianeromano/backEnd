import { MongoDbContainer } from "../../containers/mongodb";
import mongoose from "../../utils/mongodb/config";

export const ProductoSchema = new mongoose.Schema({
    timestamp: { type: Number },
    nombre: { type: String },
    descripcion: { type: String },
    codigo: { type: String },
    foto: { type: String },
    precio: { type: Number },
    stock: { type: Number },
});

class ProductosDaoMongoDb extends MongoDbContainer {
    constructor() {
        super("Producto", ProductoSchema);
    }
};

export default ProductosDaoMongoDb;