import { firestore } from "firebase-admin";

export class FirebaseContainer {
    name: string;
    constructor(name) {
        this.name = name
    }

    async save(nuevoObjeto) {
        try {
            delete(nuevoObjeto.id)
            return await firestore().collection(this.name).add({ ...nuevoObjeto });
        } catch (error) {
            console.log(error);
            throw new Error(`Error al guardar: ${error}`)
        }
    }
    async getById(id) {
        try {
            const snapshot = await firestore().collection(this.name).where(firestore.FieldPath.documentId(), "==", id).get();
            return snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))[0];
        } catch (error) {
            throw new Error(`Error al buscar un producto por id: ${error}`);
        }
    }
    async getAll() {
        try {
            const snapshot = await firestore().collection(this.name).get();
            return snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
        } catch (error) {
            return []
        }
    }
    async deleteById(id) {
        try {
            await firestore().collection(this.name).doc(id).delete();
        } catch (error) {
            throw new Error(`Error while deleting.`);
        }
    }
    async updateById(id, data) {
        try {
            await firestore().collection(this.name).doc(id).set(data);
        } catch (error) {
            throw new Error(`Error while deleting.`);
        }
    }
    async deleteAll() {
        try {
            await (await firestore().collection(this.name).listDocuments()).forEach((doc) => {
                doc.delete();
            });
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}