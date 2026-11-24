import { Link } from "react-router"
import { ArrowRight, CalendarDays, Car, Users } from "lucide-react"
import Eyebrow from "./Eyebrow.jsx"
import { formatDate, countNights, formatNights, formatDuration, plural, capitalize } from "../utils/format.js"

export default function TripCard({ viaje }) {
    const noches = countNights(viaje.fechaSalida, viaje.fechaRegreso)
    const { adultos, menores } = viaje.viajeros
    
    const detalles = [
        { Icon: CalendarDays, texto: `${formatDate(viaje.fechaSalida)} – ${formatDate(viaje.fechaRegreso)}` },
        { Icon: Users, texto: plural(adultos + menores, "viajero", "viajeros") },
        { Icon: Car, texto: capitalize(viaje.vehiculo.tipo) },
    ]

    const recorrido = [
        viaje.distanciaKm && `${Math.round(viaje.distanciaKm).toLocaleString("es-AR")} km`,
        viaje.duracionMin && formatDuration(viaje.duracionMin),
    ].filter(Boolean)

    return (
        <Link
            to={`/viajes/${viaje._id}`}
            className="group flex h-full flex-col justify-between gap-6 rounded-xl bg-white/60 border border-marron/15 p-5 transition hover:border-marron/40"
        >
            <div className="space-y-5">
                <div className="flex items-center justify-between">
                    <Eyebrow>{formatNights(noches)}</Eyebrow>
                    <ArrowRight
                        size={18}
                        className="text-marron/40 transition group-hover:translate-x-1 group-hover:text-marron"
                        aria-hidden="true"
                    />
                </div>

                <div className="space-y-1">
                    <h2 className="text-2xl font-medium">{viaje.destino.nombre}</h2>
                    <p className="text-sm text-marron/70">Desde {viaje.origen.nombre}</p>
                </div>

                <ul className="space-y-2 text-sm">
                    {detalles.map(({ Icon, texto }) => (
                        <li key={texto} className="flex items-center gap-3">
                            <Icon size={16} className="shrink-0 text-azul" aria-hidden="true" />
                            {texto}
                        </li>
                    ))}
                </ul>
            </div>

            {recorrido.length > 0 && (
                <p className="border-t border-marron/15 pt-4 text-sm text-marron/70">
                    {recorrido.join(" · ")}
                </p>
            )}
        </Link>
    )
}