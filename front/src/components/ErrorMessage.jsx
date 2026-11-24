import Button from "./Button.jsx"

export default function ErrorMessage({ message, onRetry }) {
    return (
        <div className="space-y-4 py-10">
            <p className="flex items-center gap-2">
                <i className="size-2 rounded-full bg-estado-rojo" />
                {message}
            </p>
            {onRetry && <Button variant="secondary" onClick={onRetry}>Reintentar</Button>}
        </div>
    )
}