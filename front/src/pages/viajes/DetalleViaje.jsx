import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import { ArrowLeft, Pencil, Trash2 } from "lucide-react"
import { toast } from "react-toastify"
import * as tripService from "../../services/trips.service.js"
import useTrip from "../../hooks/useTrip.js"
import { formatDate, countNights, formatNights, formatDuration, capitalize, plural, NOMBRES_COMBUSTIBLE } from "../../utils/format.js"
import Button from "../../components/Button.jsx"
import Eyebrow from "../../components/Eyebrow.jsx"
import Loading from "../../components/Loading.jsx"
import ErrorMessage from "../../components/ErrorMessage.jsx"

function Fila({ titulo, children }) {
    return (
        <div className="flex justify-between gap-4 py-4">
            <dt className="text-marron/70">{titulo}</dt>
            <dd className="text-right">{children}</dd>
        </div>
    )
}

export default function DetalleViaje() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { viaje, error, cargando, reintentar } = useTrip(id)
    const [eliminando, setEliminando] = useState(false)

    async function eliminar() {
        if (!window.confirm("¿Eliminar este viaje?")) return

        setEliminando(true)
        try {
            await tripService.deleteTrip(id)
            toast.success("Viaje eliminado")
            navigate("/viajes")
        } catch (e) {
            toast.error(e.message)
            setEliminando(false)
        }
    }

    const volver = (
        <Link to="/viajes" className="inline-flex items-center gap-2 text-sm text-marron/70">
            <ArrowLeft size={16} aria-hidden="true" /> Mis viajes
        </Link>
    )

    if (cargando) return <Loading />

    if (error) {
        return (
            <div className="mx-auto max-w-2xl p-5">
                {volver}
                <ErrorMessage message={error} onRetry={reintentar} />
            </div>
        )
    }

    const noches = countNights(viaje.fechaSalida, viaje.fechaRegreso)
    const { adultos, menores } = viaje.viajeros

    const viajeros = plural(adultos, "adulto", "adultos") +
        (menores > 0 ? ` y ${plural(menores, "menor", "menores")}` : "")
        
    const filas = [
        ["Fechas", `${formatDate(viaje.fechaSalida)} – ${formatDate(viaje.fechaRegreso)} · ${formatNights(noches)}`],
        ["Viajeros", viajeros],
        ["Vehículo", `${capitalize(viaje.vehiculo.tipo)} · ${NOMBRES_COMBUSTIBLE[viaje.vehiculo.combustible]}`],
        ["Mascotas", viaje.mascotas ? "Sí" : "No"],
    ]
    if (viaje.paradas?.length) filas.push(["Paradas", plural(viaje.paradas.length, "parada", "paradas")])
    if (viaje.distanciaKm) filas.push(["Distancia", `${Math.round(viaje.distanciaKm).toLocaleString("es-AR")} km`])
    if (viaje.duracionMin) filas.push(["Duración", formatDuration(viaje.duracionMin)])

    return (
        <div className="mx-auto max-w-2xl space-y-8 p-5">
            {volver}

            <div className="space-y-3">
                <Eyebrow>Viaje</Eyebrow>
                <h1 className="text-3xl font-medium">{viaje.destino.nombre}</h1>
                <p className="text-marron/70">{viaje.origen.nombre} → {viaje.destino.nombre}</p>
            </div>

            <dl className="divide-y divide-marron/15 border-y border-marron/15 text-sm">
                {filas.map(([titulo, valor]) => (
                    <Fila key={titulo} titulo={titulo}>{valor}</Fila>
                ))}
            </dl>

            <div className="flex flex-wrap gap-3">
                <Button variant="secondary" to={`/viajes/${id}/editar`}>
                    <Pencil size={18} className="mr-2" aria-hidden="true" /> Editar
                </Button>
                <Button variant="secondary" onClick={eliminar} disabled={eliminando}>
                    <Trash2 size={18} className="mr-2" aria-hidden="true" />
                    {eliminando ? "Eliminando..." : "Eliminar"}
                </Button>
            </div>
        </div>
    )
}