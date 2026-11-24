import Button from "../components/Button.jsx"
import Chip from "../components/Chip.jsx"
import Eyebrow from "../components/Eyebrow.jsx"
import Footer from "../components/Footer.jsx"
import hero from "../assets/hero.jpg"
import logo from "../assets/logo.svg"

const pasos = [
    { n: "01", titulo: "Armá tu recorrido", texto: "Elegí destino, origen y fechas, y mirá la ruta en el mapa." },
    { n: "02", titulo: "Sumá tus paradas", texto: "Agregá estaciones de servicio, gomerías o un punto propio, y ajustá el viaje cuando quieras." },
    { n: "03", titulo: "Enterate cómo está el camino", texto: "Mirá los avisos de otros viajeros, confirmalos y publicá los tuyos." },
]

export default function Home() {
    return (
        <>
            <section className="relative mx-5 overflow-hidden rounded-xl bg-marron">
                <img
                    src={hero}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="relative flex min-h-[32rem] flex-col items-center justify-center space-y-5 px-6 py-12 text-center md:min-h-[36rem] md:px-12">
                    <img src={logo} alt="Galopé" className="h-28 w-auto md:h-40" />
                    <h1 className="font-titulo text-xl text-marron md:text-2xl">
                        La libertad de viajar a donde quieras, <br />
                        con la seguridad de estar bien acompañado
                    </h1>
                    <p className="max-w-md text-crema font-semibold">
                        Armá tu recorrido con lo que confirmaron otros viajeros.
                    </p>
                    <div className="flex items-center gap-6 ">
                        <Button variant="inverted" to="/register">Crear cuenta</Button>
                        <a href="#como-funciona" className="rounded-lg bg-crema/20 px-5 py-3 text-sm font-semibold text-crema backdrop-blur-sm">Cómo funciona ↓</a>
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