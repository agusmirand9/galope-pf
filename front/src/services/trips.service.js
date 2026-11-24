import { call } from "./api.service.js"


export function getTrips(estado) {
    const query = estado ? `?estado=${estado}` : ""
    return call("/viajes" + query)
}

export function getTripById(id) {
    return call(`/viajes/${id}`)
}

export function saveTrip(viaje) {
    return call("/viajes", "POST", viaje)
}

export function updateTrip(id, viaje) {
    return call(`/viajes/${id}`, "PUT", viaje)
}

export function deleteTrip(id) {
    return call(`/viajes/${id}`, "DELETE")
}