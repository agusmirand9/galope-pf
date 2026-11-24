import { useState } from "react"
import { SessionContext } from "./session.context.js"
import { getStoredUser, saveStoredUser, clearStoredUser } from "../utils/storage.js"

export default function SessionProvider({ children }) {
    const [usuario, setUsuario] = useState(getStoredUser)

    // guarda la sesion el localstorage y el estado
    function onLogin(datos) {
        saveStoredUser(datos)
        setUsuario(datos)
    }

    function onLogout() {
        clearStoredUser()
        setUsuario(null)
    }

    return (
        <SessionContext.Provider value={{ usuario, onLogin, onLogout }}>
            {children}
        </SessionContext.Provider>
    )
}