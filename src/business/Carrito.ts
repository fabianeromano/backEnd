import { Producto } from "./Producto";

export class Carrito {
    id: Number;
    timestamp: number;
    productos: Producto[];

    constructor(){
        this.id = 0;
        this.timestamp = Date.now();
        this.productos = [];
    }
}