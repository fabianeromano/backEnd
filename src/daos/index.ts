import CarritosDaoFile from './carritos/CarritosDaoFile';
import CarritosDaoFirebase from './carritos/CarritosDaoMongoDb';
import CarritosDaoMongoDb from './carritos/CarritosDaoMongoDb';
import ProductosDaoFile from './productos/ProductosDaoFile';
import ProductosDaoFirebase from './productos/ProductosDaoFirebase';
import ProductosDaoMongoDb from './productos/ProductosDaoMongoDb';

export const carritosDaoFile = new CarritosDaoFile();
export const productosDaoFile = new ProductosDaoFile();
export const carritosDaoMongoDb = new CarritosDaoMongoDb();
export const productosDaoMongoDb = new ProductosDaoMongoDb();
export const carritosDaoFirebase = new CarritosDaoFirebase();
export const productosDaoFirebase = new ProductosDaoFirebase();