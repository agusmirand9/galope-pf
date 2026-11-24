import { useRouteError } from "react-router"

export default function RouteError() {
    const error = useRouteError()
    console.error(error)

    return (
        <div className="mx-auto max-w-md space-y-4 p-5 pt-10">
            <h1 className="text-2xl font-medium">Algo salió mal</h1>
            <p className="text-marron/70">Ocurrió un error inesperado en esta pantalla.</p>
            <a href="/" className="text-azul underline">Volver al inicio</a>
        </div>
    )
}