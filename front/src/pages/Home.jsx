import Button from "../components/Button.jsx"
import Chip from "../components/Chip.jsx"
import Eyebrow from "../components/Eyebrow.jsx"
import Footer from "../components/Footer.jsx"
import hero from "../assets/hero.jpg"
import logo from "../assets/logo.png"
import { Link } from "react-router"
import { Check, ClipboardCheck, Megaphone, Route } from "lucide-react"
import comunidadImg from "../assets/comunidad.jpg"
import cortadaImg from "../assets/celular.jpg"
import trama from "../assets/trama.png"



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

const planes = [
    {
        nombre: "Gratis",
        precio: "$0",
        items: [
            "Ver, publicar y confirmar avisos",
            "Puntos de interés",
            "Hasta 4 viajes a guardar",
        ],
        cta: "Empezar",
        to: "/register",
    },
    {
        nombre: "Premium",
        precio: "$4.900",
        destacado: true,
        items: [
            "Todo lo del plan gratis",
            "Viajes ilimitados",
            "Modo offline",
            "Mapa para viajes y avisos",
            "Lista de planificación",
        ],
        cta: "Empezar",
        to: "/register",
    },
    {
        nombre: "Socio Galopé",
        precio: "$9.900",
        items: [
            "Etiqueta \"Socio GALOPÉ\"",
            "Aparecés primero en tu zona",
            "Redes sociales y/o teléfono a la vista",
            "Mención en nuestras redes",
        ],
        cta: "Quiero sumar mi negocio",
        to: "/register",
    },
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
                        <a href="#como-funciona" className="inline-flex h-12 items-center justify-center rounded-xl bg-marron px-6 font-medium text-crema">Cómo funciona</a>
                    </div>
                </div>
            </section>

            <section className="mx-auto mt-48 max-w-5xl px-5">
                <div className="grid gap-10 md:grid-cols-2 md:items-center">
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <h2 className="text-xs font-medium uppercase tracking-wider text-azul">Por qué Galopé</h2>
                            <p className="text-4xl font-medium">¿Cortada la ruta? <br />Preguntale a quien ya pasó</p>
                        </div>

                        <div className="space-y-3 border-t border-marron/15 pt-5 text-marron/70">
                            <p>
                                Una rueda pinchada, un camino que no conocés y ninguna gomería a la vista.
                                La que sí está abierta, no figura en internet.
                            </p>
                            <p>La información existe, está en quienes recorren las rutas todos los días.</p>
                            <p className="font-medium text-marron">
                                Galopé es el lugar donde esa información se reúne y se confirma.
                            </p>
                        </div>

                        <Button variant="secondary" to="/register">Crear cuenta →</Button>
                    </div>

                    <img
                        src={cortadaImg}
                        alt=""
                        loading="lazy"
                        className="aspect-4/3 w-full rounded-xl object-cover"
                    />
                </div>
            </section>

            <section id="como-funciona" className="mx-auto mt-48 max-w-5xl scroll-mt-24 px-5">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div className="space-y-3">
                        <h2 className="text-xs font-medium uppercase tracking-wider text-azul">Cómo funciona</h2>
                        <p className="text-4xl font-medium">Así te acompañamos</p>
                    </div>
                    <Button variant="secondary" to="/register" className="self-start">Empezar →</Button>
                </div>

                <div className="mt-10 grid gap-8 md:grid-cols-3">
                    {features.map(({ Icon, titulo, texto, conChips }) => (
                        <article key={titulo} className="space-y-3 rounded-xl border border-azul/30 p-6">
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
                        <h2 className="text-xs font-medium uppercase tracking-wider text-azul">Avisos</h2>
                        <p className="text-4xl font-medium">Lo que pasa en la ruta, contado por quienes están ahí</p>
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
                        alt=""
                        loading="lazy"
                        className="aspect-4/3 w-full rounded-xl object-cover md:order-2"
                    />

                    <div className="space-y-8">
                        <div className="space-y-3">
                            <h2 className="text-xs font-medium uppercase tracking-wider text-azul">Comunidad</h2>
                            <p className="text-4xl font-medium">De viajeros para viajeros</p>
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

            <section id="planes" className="mx-auto mt-48 max-w-5xl scroll-mt-24 px-5">
                <div className="space-y-3">
                    <h2 className="text-xs font-medium uppercase tracking-wider text-azul">Planes</h2>
                    <p className="text-4xl font-medium">Los avisos y el clima son siempre gratis.</p>
                    <p className="text-sm text-marron/70">Premium suma comodidad para los que viajan más.</p>
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-3">
                    {planes.map(({ nombre, precio, items, cta, to, destacado }) => (
                        <article
                            key={nombre}
                            className={`flex flex-col gap-6 rounded-xl p-6 ${destacado ? "border-2 border-azul" : "border border-azul/30"}`}
                        >
                            <div className="space-y-3">
                                <div className="flex items-center justify-between gap-2">
                                    <h3 className="text-xl font-medium">{nombre}</h3>
                                    {destacado && (
                                        <span className="rounded-xl bg-azul px-3 py-1 text-xs font-medium text-celeste-claro">
                                            Más elegido
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-marron/70">Mensual</p>
                                    <p className="text-4xl font-medium text-azul">{precio}</p>
                                </div>
                            </div>

                            <div className="flex-1 space-y-3 border-t border-marron/15 pt-5">
                                <p className="text-xs font-medium uppercase tracking-wider">Incluye</p>
                                <ul className="space-y-3">
                                    {items.map(item => (
                                        <li key={item} className="flex items-start gap-3 text-sm">
                                            <Check size={18} strokeWidth={2} className="mt-0.5 shrink-0 text-azul" aria-hidden="true" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Button variant={destacado ? "primary" : "secondary"} to={to} className="w-full">
                                {cta}
                            </Button>
                        </article>
                    ))}
                </div>
            </section>

            <section className="mx-auto mb-48 mt-48 max-w-5xl px-5">
                <div style={{ backgroundImage: `url(${trama})` }}
    className="flex flex-col items-center justify-center gap-6 rounded-xl border border-azul bg-celeste-claro bg-cover bg-center px-6 py-14 text-center md:py-16">
                    <div className="space-y-3">
                        <h2 className="text-xs font-medium uppercase tracking-wider text-azul">Sumate</h2>
                        <p className="text-4xl font-medium">Creá tu cuenta</p>
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