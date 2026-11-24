import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import * as tripService from "../../services/trips.service.js"
import Eyebrow from "../../components/Eyebrow.jsx"
import TripForm from "../../components/TripForm.jsx"

export default function NuevoViaje() {
    const navigate = useNavigate()

    async function guardar(datos) {
        try {
            await tripService.saveTrip(datos)
            toast.success("Viaje guardado")
            navigate("/viajes")
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className="mx-auto max-w-2xl space-y-8 p-5">
            <div className="space-y-3">
                <Eyebrow>Nuevo viaje</Eyebrow>
                <h1 className="text-3xl font-medium">¿Adónde vamos?</h1>
            </div>
            <TripForm onSubmit={guardar} submitLabel="Guardar viaje" />
        </div>
    )
}