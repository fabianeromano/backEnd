import { FileContainer } from "../../containers/files";

class CarritosDaoFile extends FileContainer {
    constructor(){
        super("./carrito.txt");
    }
};

export default CarritosDaoFile;