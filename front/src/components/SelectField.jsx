export default function SelectField({ label, id, error, options, placeholder, ...selectProps }) {
    return (
        <div className="space-y-2">
            <label htmlFor={id} className="text-sm font-medium">{label}</label>
            <select
                id={id}
                aria-invalid={!!error}
                className="h-12 w-full rounded-xl border border-marron/25 bg-transparent px-4 outline-azul focus:outline-2"
                {...selectProps}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            {error && (
                <p className="flex items-center gap-2 text-sm">
                    <i className="size-2 rounded-full bg-estado-rojo" />
                    {error}
                </p>
            )}
        </div>
    )
}