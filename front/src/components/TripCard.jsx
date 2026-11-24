import { Link } from "react-router"
import Card from "./Card.jsx"
import { formatDate, countNights, formatDuration } from "../utils/format.js"

export default function TripCard({ viaje }) {
    const noches = countNights(viaje.fechaSalida, viaje.fechaRegreso)
    const textoNoches = noches === 0 ? "en el día" : `${noches} ${noches === 1 ? "noche" : "noches"}`
    
    const datos = [
        viaje.distanciaKm && `${Math.round(viaje.distanciaKm).toLocaleString("es-AR")} km`,
        viaje.duracionMin && formatDuration(viaje.duracionMin),
    ].filter(Boolean)

    return (
        <Card to={`/viajes/${viaje._id}`}>
            <div className="space-y-1">
                <h2 className="text-xl font-medium">
                    <Link to={`/viajes/${viaje._id}`}>{viaje.destino.nombre}</Link>
                </h2>
                <p className="text-sm text-marron/70">
                    {formatDate(viaje.fechaSalida)} – {formatDate(viaje.fechaRegreso)} · {textoNoches}
                </p>
                <p className="text-sm text-marron/70">
                    {viaje.origen.nombre} → {viaje.destino.nombre}
                </p>
                {datos.length > 0 && (
                    <p className="text-sm text-marron/70">{datos.join(" · ")}</p>
                )}
            </div>
        </Card>
    )
}