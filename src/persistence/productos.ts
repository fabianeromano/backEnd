import { FileHandler } from "../lib/files";

const productoRepository = new FileHandler("./productos.txt");

export default productoRepository;