import Button from "../components/Button.jsx"
import Chip from "../components/Chip.jsx"
import Eyebrow from "../components/Eyebrow.jsx"
import Footer from "../components/Footer.jsx"
import hero from "../assets/hero.jpg"
import logo from "../assets/logo.png"
import { Link } from "react-router"
import { ClipboardCheck, Megaphone, Route } from "lucide-react"
import comunidadImg from "../assets/comunidad.jpg"


const features = [
    { Icon: Route, titulo: "Recorrido a tu medida", texto: "Armá tu ruta, sumá tus paradas y cambiala cuando quieras." },
    { Icon: ClipboardCheck, titulo: "Viaje organizado", texto: "Planificá antes, navegá durante y guardá los recuerdos después." },
    { Icon: Megaphone, titulo: "Información confiable", texto: "Cortes, estado del camino y clima, confirmados por otros viajeros.", conChips: true },
]

const comunidad = [
    { n: "01", texto: "Publicá y confirmá avisos de la ruta." },
    { n: "02", texto: "Armá y guardá tus recorridos." },
    { n: "03", texto: "Sumate a una comunidad de viajeros reales." },
]

export default function Home() {
    return (
        <>
            <section className="relative mx-5 -mt-10 overflow-hidden rounded-xl bg-marron">
                <img
                    src={hero}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="relative flex min-h-[32rem] flex-col items-center justify-center space-y-5 px-6 py-12 text-center md:min-h-[36rem] md:px-12">
                    <img src={logo} alt="Galopé" className="h-28 w-auto md:h-40" />
                    <h1 className="font-titulo text-xl text-marron md:text-2xl">
                        Tu ruta, tu viaje.
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

            <section className="mx-auto mt-48 max-w-5xl px-5">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div className="space-y-3">
                        <Eyebrow>Por qué Galopé</Eyebrow>
                        <h2 className="text-3xl font-medium">¿Cortada la ruta? <br />Preguntale a quien ya pasó</h2>
                    </div>
                    <Button variant="secondary" to="/register" className="self-start">Crear cuenta →</Button>
                </div>

                <div className="mt-10 max-w-xl space-y-3 border-t border-marron/15 pt-5 text-marron/70">
                    <p>
                        Una rueda pinchada, un camino que no conocés y ninguna gomería a la vista.
                        La que sí está abierta, no figura en internet.
                    </p>
                    <p>La información existe, está en quienes recorren las rutas todos los días.</p>
                    <p className="font-medium text-marron">
                        Galopé es el lugar donde esa información se reúne y se confirma.
                    </p>
                </div>
            </section>

            <section id="como-funciona" className="mx-auto mt-48 max-w-5xl scroll-mt-24 px-5">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div className="space-y-3">
                        <Eyebrow>Cómo funciona</Eyebrow>
                        <h2 className="text-3xl font-medium">Así te acompañamos</h2>
                    </div>
                    <Button variant="secondary" to="/register" className="self-start">Empezar →</Button>
                </div>

                <div className="mt-10 grid gap-8 md:grid-cols-3">
                    {features.map(({ Icon, titulo, texto, conChips }) => (
                        <article key={titulo} className="space-y-3 border-t border-marron/15 pt-5">
                            <Icon size={28} strokeWidth={1.5} className="text-azul" aria-hidden="true" />
                            <h3 className="text-xl font-medium">{titulo}</h3>
                            <p className="text-sm text-marron/70">{texto}</p>
                            {conChips && (
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

            <section id="avisos" className="mx-auto mt-48 max-w-5xl scroll-mt-24 px-5">
                <div className="grid gap-8 md:grid-cols-2 md:items-center">
                    <div className="space-y-3">
                        <Eyebrow>Avisos</Eyebrow>
                        <h2 className="text-3xl font-medium">Lo que pasa en la ruta, contado por quienes están ahí</h2>
                        <p className="text-sm text-marron/70">
                            Cada aviso muestra cuántos viajeros lo confirmaron y hace cuánto se publicó.
                            Así sabés en qué confiar.
                        </p>
                    </div>

                    <article className="space-y-3 rounded-xl bg-estado-verde/15 p-5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <Chip estado="verde">Ruta libre</Chip>
                            <span className="text-xs text-marron/70">Ejemplo</span>
                        </div>
                        <p>Ruta 40, San Rafael: tránsito fluido.</p>
                        <p className="text-sm text-marron/70">Confirmado por 12 viajeros · hace 5 min</p>
                    </article>
                </div>
            </section>

            <section id="comunidad" className="mx-auto mt-48 max-w-5xl scroll-mt-24 px-5">
                <div className="grid gap-10 md:grid-cols-2 md:items-center">
                    <img
                        src={comunidadImg}
                        alt="Viajeros en la ruta"
                        loading="lazy"
                        className="aspect-4/3 w-full rounded-xl object-cover md:order-2"
                    />

                    <div className="space-y-8">
                        <div className="space-y-3">
                            <Eyebrow>Comunidad</Eyebrow>
                            <h2 className="text-3xl font-medium">De viajeros para viajeros</h2>
                            <p className="text-sm text-marron/70">
                                Cada ruta que alguien recorre deja una pista para el que viene detrás. Sumá la tuya.
                            </p>
                        </div>

                        <div>
                            {comunidad.map(item => (
                                <article key={item.n} className="space-y-2 border-t border-marron/15 py-4">
                                    <Eyebrow>{item.n}</Eyebrow>
                                    <p className="text-lg font-medium">{item.texto}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto mb-48 mt-48 max-w-5xl px-5">
                <div className="flex flex-col items-center gap-6 rounded-xl border border-azul px-6 py-16 text-center">
                    <div className="space-y-3">
                        <Eyebrow>Sumate</Eyebrow>
                        <h2 className="text-3xl font-medium">Creá tu cuenta</h2>
                        <p className="mx-auto max-w-md text-sm text-marron/70">
                            Los avisos son siempre gratis. Sumate y salí a la ruta.
                        </p>
                    </div>

                    <Button to="/register">Crear cuenta</Button>

                    <p className="text-sm text-marron/70">
                        ¿Ya tenés cuenta? <Link to="/login" className="font-medium text-marron">Iniciá sesión</Link>
                    </p>
                </div>
            </section>

            <Footer />
        </>
    )
}