import { call } from "./api.service.js"

export function saveUser(datos) {
    return call("/usuarios", "POST", datos)
}

export function login(datos) {
    return call("/usuarios/login", "POST", datos)
}