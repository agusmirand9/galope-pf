import { db } from "../db.js"
import { HttpError } from "../utils/httpError.js"
import { toObjectId } from "../utils/toObjectId.js"

const viajes = db.collection("viajes")

// Filtro para buscar 1 viaje
function ownedFilter(id, usuarioId) {
    return {
        _id: toObjectId(id),
        usuarioId: toObjectId(usuarioId),
        eliminado: { $ne: true }
    }
}

// crea un viaje
export async function saveTrip(datos, usuarioId) {
    const viaje = {
        ...datos,                       
        usuarioId: toObjectId(usuarioId),  
        creadoEn: new Date()
    }

    const { insertedId } = await viajes.insertOne(viaje)

    return { _id: insertedId, ...viaje }
}

// lista los viajes del usuario
export async function getTrips(usuarioId, filtros = {}) {
    const estados = ["proximos", "pasados"]
    if (filtros.estado && !estados.includes(filtros.estado)) {
        throw new HttpError(400, "El estado debe ser 'proximos' o 'pasados'")
    }

    const hoy = new Date().toLocaleDateString("en-CA", {
        timeZone: "America/Argentina/Buenos_Aires"
    })

    const filtro = { usuarioId: toObjectId(usuarioId), eliminado: { $ne: true } }
    let orden = { fechaSalida: 1 }  

    if (filtros.estado === "proximos") {
        filtro.fechaRegreso = { $gte: hoy }   
    } else if (filtros.estado === "pasados") {
        filtro.fechaRegreso = { $lt: hoy }
        orden = { fechaSalida: -1 }         
    }

    return await viajes.find(filtro).sort(orden).toArray()
}

// leer, un viaje por id, si no existe o es de otra persona, 404
export async function getTripById(id, usuarioId) {
    const viaje = await viajes.findOne(ownedFilter(id, usuarioId))
    if (!viaje) throw new HttpError(404, "Viaje no encontrado")
    return viaje
}

// editar, busca el viaje, lo modifica y devuelve el resultado nuevo
export async function updateTrip(id, datos, usuarioId) {
    const viaje = await viajes.findOneAndUpdate(
        ownedFilter(id, usuarioId),
        { $set: { ...datos, actualizadoEn: new Date() } },
        { returnDocument: "after" }
    )

    if (!viaje) throw new HttpError(404, "Viaje no encontrado")
    return viaje
}

// borrado lógico
export async function deleteTrip(id, usuarioId) {
    const resultado = await viajes.updateOne(
        ownedFilter(id, usuarioId),
        { $set: { eliminado: true, eliminadoEn: new Date() } }
    )

    // docs que coincidieron
    if (resultado.matchedCount === 0) throw new HttpError(404, "Viaje no encontrado")
}