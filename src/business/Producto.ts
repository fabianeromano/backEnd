export class Producto {
    id: Number;
    timestamp: number;
    nombre: String;
    descripcion: String;
    codigo: String;
    foto: any;
    precio: any;
    stock: any;

    constructor(nombre, descripcion, codigo, foto, precio, stock){
        this.id = 0;
        this.timestamp = Date.now();
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.codigo = codigo;
        this.foto = foto;
        this.precio = precio;
        this.stock = stock;
    }
}