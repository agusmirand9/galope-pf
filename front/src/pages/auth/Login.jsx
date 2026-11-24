import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, Navigate, useNavigate } from "react-router"
import { toast } from "react-toastify"
import { loginSchema } from "../../schemas/users.js"
import * as userService from "../../services/users.service.js"
import { useSession } from "../../context/session.context.js"
import Button from "../../components/Button.jsx"
import Eyebrow from "../../components/Eyebrow.jsx"
import FormField from "../../components/FormField.jsx"

export default function Login() {
    const { usuario, onLogin } = useSession()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(loginSchema)
    })

    async function onSubmit(datos) {
        try {
            const sesion = await userService.login(datos)
            onLogin(sesion)
            navigate("/viajes")
        } catch (error) {
            toast.error(error.message)
        }
    }

    if (usuario) return <Navigate to="/viajes" replace />

    return (
        <div className="mx-auto max-w-md space-y-8 p-5 pt-10">
            <div className="space-y-3">
                <Eyebrow>Ingresar</Eyebrow>
                <h1 className="text-3xl font-medium">Bienvenido</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                <FormField id="email" label="Email" type="email" autoComplete="email"
                    error={errors.email?.message} {...register("email")} />
                <FormField id="password" label="Contraseña" type="password" autoComplete="current-password"
                    error={errors.password?.message} {...register("password")} />
                <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Ingresando..." : "Ingresar"}
                </Button>
            </form>

            <p className="text-sm text-marron/70">
                ¿No tenés cuenta? <Link to="/register" className="font-medium text-marron">Creála acá</Link>
            </p>
        </div>
    )
}