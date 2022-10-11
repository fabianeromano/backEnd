import { FileContainer } from "../../containers/files";

class ProductosDaoFile extends FileContainer {
    constructor(){
        super("./productos.txt");
    }
};

export default ProductosDaoFile;