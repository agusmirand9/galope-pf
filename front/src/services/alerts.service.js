import { call } from "./api.service.js"

export function getAlerts(tipo) {
    const query = tipo ? `?tipo=${tipo}` : ""
    return call("/avisos" + query)
}

export function getAlertById(id) {
    return call(`/avisos/${id}`)
}

export function saveAlert(aviso) {
    return call("/avisos", "POST", aviso)
}

export function confirmAlert(id) {
    return call(`/avisos/${id}/confirmaciones`, "POST")
}

export function updateAlert(id, datos) {
    return call(`/avisos/${id}`, "PATCH", datos)
}

export function deleteAlert(id) {
    return call(`/avisos/${id}`, "DELETE")
}