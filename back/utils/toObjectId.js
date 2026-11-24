import { ObjectId } from "mongodb"
import { HttpError } from "./httpError.js"

//convierte el texto de un id aun objetcid de mongodb
export function toObjectId(id) {
    if (!/^[a-f\d]{24}$/i.test(id)) {
        throw new HttpError(400, "ID inválido")
    }
    return new ObjectId(id)
}