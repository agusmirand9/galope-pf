import { useNavigate } from "react-router"
import { LogOut } from "lucide-react"
import { useSession } from "../context/session.context.js"
import Button from "../components/Button.jsx"
import Eyebrow from "../components/Eyebrow.jsx"

export default function Perfil() {
    const { usuario, onLogout } = useSession()
    const navigate = useNavigate()

    function cerrarSesion() {
        onLogout()
        navigate("/")
    }

    return (
        <div className="mx-auto max-w-md space-y-8 p-5">
            <div className="space-y-3">
                <Eyebrow>Perfil</Eyebrow>
                <h1 className="text-3xl font-medium">{usuario.nombre}</h1>
            </div>

            <dl className="divide-y divide-marron/15 border-y border-marron/15 text-sm">
                <div className="flex justify-between py-4">
                    <dt className="text-marron/70">Usuario</dt>
                    <dd>@{usuario.username}</dd>
                </div>
                <div className="flex justify-between py-4">
                    <dt className="text-marron/70">Email</dt>
                    <dd>{usuario.email}</dd>
                </div>
            </dl>

            <Button variant="secondary" onClick={cerrarSesion}>
                <LogOut size={18} className="mr-2" aria-hidden="true" /> Cerrar sesión
            </Button>
        </div>
    )
}