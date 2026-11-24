export default function FormField({ label, id, error, ...inputProps }) {
    return (
        <div className="space-y-2">
            <label htmlFor={id} className="text-sm font-medium">{label}</label>
            <input
                id={id}
                aria-invalid={!!error}
                className="h-12 w-full rounded-xl border border-marron/25 bg-transparent px-4 outline-azul focus:outline-2"
                {...inputProps}
            />
            {error && (
                <p className="flex items-center gap-2 text-sm">
                    <i className="size-2 rounded-full bg-estado-rojo" />
                    {error}
                </p>
            )}
        </div>
    )
}