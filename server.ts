import { app } from "./src/app";

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`conectado al puerto: ${PORT}`);
});