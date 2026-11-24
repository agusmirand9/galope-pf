import { db } from "../db.js"
import { HttpError } from "../utils/httpError.js"
import { toObjectId } from "../utils/toObjectId.js"
import { ALERT_TYPES } from "../schemas/alerts.js"

const avisos = db.collection("avisos")

//cuanto dura un aviso sin que otros lo confirmne
const ALERT_TTL_MS = 24 * 60 * 60 * 1000

//cuando vence un aviso
function expiryFrom(fecha) {
    return new Date(fecha.getTime() + ALERT_TTL_MS)
}

//avisos activos
function activeFilter() {
    return {
        eliminado: { $ne: true },
        venceEn: { $gt: new Date() } 
    }
}

//como se muestra publicado
function toPublicAlert(aviso, uid) {
    const { confirmaciones, usuarioId: autorId, eliminado, eliminadoEn, ...resto } = aviso
    return {
        ...resto,
        cantidadConfirmaciones: confirmaciones.length,
        confirmadoPorMi: confirmaciones.some(id => id.equals(uid)),
        esMio: autorId.equals(uid)
    }
}

//publicar un aviso
export async function saveAlert(datos, usuario) {
    const uid = toObjectId(usuario.id)
    const ahora = new Date()

    const aviso = {
        ...datos,
        usuarioId: uid,
        username: usuario.username,
        confirmaciones: [uid],
        creadoEn: ahora,
        venceEn: expiryFrom(ahora)
    }

    const { insertedId } = await avisos.insertOne(aviso)

    return toPublicAlert({ _id: insertedId, ...aviso }, uid)
}

//lista de avis vivos
export async function getAlerts(usuarioId, filtros = {}) {
    if (filtros.tipo && !ALERT_TYPES.includes(filtros.tipo)) {
        throw new HttpError(400, "Tipo de aviso inválido")
    }

    const filtro = activeFilter()
    if (filtros.tipo) filtro.tipo = filtros.tipo

    const uid = toObjectId(usuarioId)
    const lista = await avisos.find(filtro).sort({ creadoEn: -1 }).toArray()

    return lista.map(aviso => toPublicAlert(aviso, uid))
}

//un aviso por id
export async function getAlertById(id, usuarioId) {
    const aviso = await avisos.findOne({ _id: toObjectId(id), ...activeFilter() })
    if (!aviso) throw new HttpError(404, "Aviso no encontrado")
    return toPublicAlert(aviso, toObjectId(usuarioId))
}

//confirmar aviso, renueva vencimiento
export async function confirmAlert(id, usuarioId) {
    const uid = toObjectId(usuarioId)
    const alertId = toObjectId(id)

    const aviso = await avisos.findOneAndUpdate(
        { _id: alertId, ...activeFilter(), confirmaciones: { $ne: uid } },
        {
            $addToSet: { confirmaciones: uid },
            $set: { venceEn: expiryFrom(new Date()) }
        },
        { returnDocument: "after" }
    )

    if (aviso) return toPublicAlert(aviso, uid)

    //avisa si no encontro el aviso o si ya lo confirmo
    const existe = await avisos.findOne({ _id: alertId, ...activeFilter() })
    if (!existe) throw new HttpError(404, "Aviso no encontrado")
    throw new HttpError(409, "Ya confirmaste este aviso")
}

async function failNotOwned(id) {
    const existe = await avisos.findOne(
        { _id: toObjectId(id), ...activeFilter() },
        { projection: { _id: 1 } }
    )
    if (!existe) throw new HttpError(404, "Aviso no encontrado")
    throw new HttpError(403, "No podés modificar un aviso de otra persona")
}


//editar aviso, solo descripcion
export async function updateAlert(id, datos, usuarioId) {
    const uid = toObjectId(usuarioId)

    const aviso = await avisos.findOneAndUpdate(
        { _id: toObjectId(id), usuarioId: uid, ...activeFilter() },
        { $set: { descripcion: datos.descripcion, actualizadoEn: new Date() } },
        { returnDocument: "after" }
    )

    if (!aviso) await failNotOwned(id)
    return toPublicAlert(aviso, uid)
}

//borrado logico, solo el dueño puede
export async function deleteAlert(id, usuarioId) {
    const resultado = await avisos.updateOne(
        { _id: toObjectId(id), usuarioId: toObjectId(usuarioId), ...activeFilter() },
        { $set: { eliminado: true, eliminadoEn: new Date() } }
    )

    if (resultado.matchedCount === 0) await failNotOwned(id)
}