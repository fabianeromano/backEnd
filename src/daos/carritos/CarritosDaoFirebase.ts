import { FirebaseContainer } from "../../containers/firebase";

class CarritosDaoFirebase extends FirebaseContainer {
    constructor(){
        super("carrito");
    }
};

export default CarritosDaoFirebase;