import { app } from "./src/app";
import { connectFirebase } from "./src/utils/firebase/config";
import { connectMongoDb } from "./src/utils/mongodb/config";

const PORT = process.env.PORT || 8080;
async function initServices(){
    await connectMongoDb();
    await connectFirebase();
}

initServices().then(function(){
    app.listen(PORT, async () => {
        console.log(`conectado al puerto: ${PORT}`);
    });
})
