import Button from "../components/Button.jsx"
import Chip from "../components/Chip.jsx"
import Eyebrow from "../components/Eyebrow.jsx"
import Footer from "../components/Footer.jsx"

const pasos = [
    { n: "01", titulo: "Armá tu recorrido", texto: "Elegí destino, origen y fechas, y mirá la ruta en el mapa." },
    { n: "02", titulo: "Sumá tus paradas", texto: "Agregá estaciones de servicio, gomerías o un punto propio, y ajustá el viaje cuando quieras." },
    { n: "03", titulo: "Enterate cómo está el camino", texto: "Mirá los avisos de otros viajeros, confirmalos y publicá los tuyos." },
]

export default function Home() {
    return (
        <>
            {/* cambiar desp el degradado por la img */}
            <section className="relative mx-5 overflow-hidden rounded-xl bg-marron">
                <div className="absolute inset-0 bg-linear-to-b from-azul/50 to-marron to-70%" />
                <div className="relative space-y-6 px-6 pb-12 pt-40 md:px-12 md:pt-56">
                    <h1 className="font-titulo text-4xl text-crema md:text-6xl">
                        Tu ruta, <br />tu viaje.
                    </h1>
                    <p className="max-w-md text-celeste-claro">
                        Armá tu recorrido con lo que confirmaron otros viajeros.
                    </p>
                    <div className="flex items-center gap-6">
                        <Button variant="inverted" to="/register">Crear cuenta</Button>
                        <a href="#como-funciona" className="text-sm text-celeste-claro">Cómo funciona ↓</a>
                    </div>
                </div>
            </section>

            <section id="como-funciona" className="mx-auto mt-20 max-w-5xl px-5">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div className="space-y-3">
                        <Eyebrow>Cómo funciona</Eyebrow>
                        <h2 className="text-3xl font-medium">Salí a la ruta en tres pasos</h2>
                    </div>
                    <Button variant="secondary" to="/register" className="self-start">Empezar →</Button>
                </div>

                <div className="mt-10 grid gap-8 md:grid-cols-3">
                    {pasos.map(paso => (
                        <article key={paso.n} className="space-y-3 border-t border-marron/15 pt-5">
                            <Eyebrow>{paso.n}</Eyebrow>
                            <h3 className="text-xl font-medium">{paso.titulo}</h3>
                            <p className="text-sm text-marron/70">{paso.texto}</p>
                            {paso.n === "03" && (
                                <div className="flex flex-wrap gap-2 pt-2">
                                    <Chip estado="rojo">Ruta cortada</Chip>
                                    <Chip estado="amarillo">Obra o demora</Chip>
                                    <Chip estado="verde">Ruta libre</Chip>
                                </div>
                            )}
                        </article>
                    ))}
                </div>
            </section>

            <Footer />
        </>
    )
}