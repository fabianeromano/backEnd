import { FirebaseContainer } from "../../containers/firebase";

class ProductosDaoFirebase extends FirebaseContainer {
    constructor(){
        super("producto");
    }
};

export default ProductosDaoFirebase;