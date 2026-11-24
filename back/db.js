import { MongoClient } from "mongodb"

const client = new MongoClient(process.env.MONGO_URI)

export const db = client.db(process.env.DB_NAME)

//indice unico, directo mongodb rechaza si alguno se repite
async function createIndexes() {
    await db.collection("usuarios").createIndex({ email: 1 }, { unique: true }, undefined)
    await db.collection("usuarios").createIndex({ username: 1 }, { unique: true }, undefined)
    await db.collection("avisos").createIndex({ venceEn: 1 }, { expireAfterSeconds: 0 }, undefined)
}

export async function connectDB() {
    await client.connect()
    await db.command({ ping: 1 })
    await createIndexes()
    console.log("Conectado a MongoDB")
}