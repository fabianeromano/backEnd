import { MongoDbContainer } from "../../containers/mongodb";
import mongoose from "../../utils/mongodb/config";
import { ProductoSchema } from "../productos/ProductosDaoMongoDb";

export const CarritoSchema = new mongoose.Schema({
    timestamp: { type: Number},
    productos: [ProductoSchema],
});

class CarritosDaoFirebase extends MongoDbContainer {
    constructor(){
        super("Carrito", CarritoSchema);
    }
};

export default CarritosDaoFirebase;