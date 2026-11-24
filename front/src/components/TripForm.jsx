import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { tripSchema, VEHICLE_TYPES, FUEL_TYPES } from "../schemas/trips.js"
import Button from "./Button.jsx"
import FormField from "./FormField.jsx"
import SelectField from "./SelectField.jsx"
import PlaceSelect from "./PlaceSelect.jsx"
import { capitalize, NOMBRES_COMBUSTIBLE } from "../utils/format.js"

const VEHICULOS = VEHICLE_TYPES.map(v => ({ value: v, label: capitalize(v) }))
const COMBUSTIBLES = FUEL_TYPES.map(c => ({ value: c, label: NOMBRES_COMBUSTIBLE[c] }))

const VALORES_INICIALES = {
    viajeros: { adultos: 1, menores: 0 },
    vehiculo: { tipo: "", combustible: "" },
    mascotas: false,
}

export default function TripForm({ defaultValues = VALORES_INICIALES, onSubmit, submitLabel }) {
    const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(tripSchema),
        defaultValues
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
            <div className="grid gap-5 sm:grid-cols-2">
                <PlaceSelect control={control} name="origen" label="Origen"
                    error={errors.origen && "Elegí el origen"} />
                <PlaceSelect control={control} name="destino" label="Destino"
                    error={errors.destino && "Elegí el destino"} />

                <FormField id="fechaSalida" label="Fecha de salida" type="date"
                    error={errors.fechaSalida?.message} {...register("fechaSalida")} />
                <FormField id="fechaRegreso" label="Fecha de regreso" type="date"
                    error={errors.fechaRegreso?.message} {...register("fechaRegreso")} />

                <FormField id="adultos" label="Adultos" type="number" min="1"
                    error={errors.viajeros?.adultos?.message}
                    {...register("viajeros.adultos", { valueAsNumber: true })} />
                <FormField id="menores" label="Menores" type="number" min="0"
                    error={errors.viajeros?.menores?.message}
                    {...register("viajeros.menores", { valueAsNumber: true })} />

                <SelectField id="tipo" label="Vehículo" placeholder="Elegí un vehículo" options={VEHICULOS}
                    error={errors.vehiculo?.tipo?.message} {...register("vehiculo.tipo")} />
                <SelectField id="combustible" label="Combustible" placeholder="Elegí el combustible" options={COMBUSTIBLES}
                    error={errors.vehiculo?.combustible?.message} {...register("vehiculo.combustible")} />
            </div>

            <label className="flex items-center gap-3 text-sm">
                <input type="checkbox" className="size-4 accent-marron" {...register("mascotas")} />
                Viajo con mascotas
            </label>

            <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                {isSubmitting ? "Guardando..." : submitLabel}
            </Button>
        </form>
    )
}