// clave para localStorage
const USER_KEY = "usuario"

// Lee el usuario guardado
export function getStoredUser() {
    try {
        return JSON.parse(localStorage.getItem(USER_KEY))
    } catch {
        return null
    }
}

// Guarda el usuario
export function saveStoredUser(usuario) {
    localStorage.setItem(USER_KEY, JSON.stringify(usuario))
}

// Borra la sesión
export function clearStoredUser() {
    localStorage.removeItem(USER_KEY)
}