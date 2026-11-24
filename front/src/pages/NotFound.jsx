import { Link } from "react-router"

export default function NotFound() {
    return (
        <div className="space-y-3 p-5">
            <h1 className="text-2xl font-medium">Esta página no existe</h1>
            <Link to="/" className="text-azul">Volver al inicio</Link>
        </div>
    )
}