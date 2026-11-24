import { getStoredUser, clearStoredUser  } from "../utils/storage.js"

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:2026/api"

//muestra posibles errores
export class ApiError extends Error {
    constructor(message, status, errors = []) {
        super(message)
        this.status = status 
        this.errors = errors 
    }
}

export async function call(uri, method = "GET", body = undefined) {
    const headers = { "Content-Type": "application/json" }

    const token = getStoredUser()?.token
    if (token) headers.authorization = `Bearer ${token}`

    let res
    try {
        res = await fetch(API_URL + uri, {
            method,
            headers,
            body: body === undefined ? undefined : JSON.stringify(body)
        })
    } catch {
        throw new ApiError("No se pudo conectar con el servidor", 0)
    }

    const data = await res.json().catch(() => null)

        if (!res.ok) {
            if (res.status === 401 && token && uri !== "/usuarios/login") {
                clearStoredUser()
                window.location.assign("/login")
            }
        throw new ApiError(data?.message ?? "Ocurrió un error inesperado", res.status, data?.errors)
    }

    return data
}