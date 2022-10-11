export class Producto {
    id: Number;
    timestamp: Number;
    nombre: String;
    descripcion: String;
    codigo: String;
    foto: String;
    precio: Number;
    stock: Number;

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