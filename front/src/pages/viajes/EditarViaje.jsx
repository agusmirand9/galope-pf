import { Link, useNavigate, useParams } from "react-router"
import { toast } from "react-toastify"
import * as tripService from "../../services/trips.service.js"
import useTrip from "../../hooks/useTrip.js"
import Eyebrow from "../../components/Eyebrow.jsx"
import Loading from "../../components/Loading.jsx"
import ErrorMessage from "../../components/ErrorMessage.jsx"
import TripForm from "../../components/TripForm.jsx"

export default function EditarViaje() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { viaje, error, cargando, reintentar } = useTrip(id)

    async function guardar(datos) {
        try {
            await tripService.updateTrip(id, datos)
            toast.success("Cambios guardados")
            navigate(`/viajes/${id}`)
        } catch (e) {
            toast.error(e.message)
        }
    }

    if (cargando) return <Loading />

    if (error) {
        return (
            <div className="mx-auto max-w-2xl p-5">
                <ErrorMessage message={error} onRetry={reintentar} />
                <Link to="/viajes" className="text-sm text-marron/70">Volver a Mis viajes</Link>
            </div>
        )
    }

    return (
        <div className="mx-auto max-w-2xl space-y-8 p-5">
            <div className="space-y-3">
                <Eyebrow>Editar viaje</Eyebrow>
                <h1 className="text-3xl font-medium">{viaje.destino.nombre}</h1>
            </div>
            <TripForm defaultValues={viaje} onSubmit={guardar} submitLabel="Guardar cambios" />
        </div>
    )
}