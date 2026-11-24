import { Controller } from "react-hook-form"
import { DESTINOS } from "../utils/destinos.js"
import SelectField from "./SelectField.jsx"

const OPCIONES = DESTINOS.map(d => ({ value: d.nombre, label: d.nombre }))

export default function PlaceSelect({ control, name, label, error }) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <SelectField
                    id={name}
                    label={label}
                    error={error}
                    placeholder="Elegí una ciudad"
                    options={OPCIONES}
                    value={field.value?.nombre ?? ""}
                    onChange={e => field.onChange(DESTINOS.find(d => d.nombre === e.target.value))}
                    onBlur={field.onBlur}
                    ref={field.ref}
                />
            )}
        />
    )
}