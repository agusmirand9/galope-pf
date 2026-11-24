import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, Navigate, useNavigate } from "react-router"
import { toast } from "react-toastify"
import { registerSchema } from "../../schemas/users.js"
import * as userService from "../../services/users.service.js"
import { useSession } from "../../context/session.context.js"
import Button from "../../components/Button.jsx"
import Eyebrow from "../../components/Eyebrow.jsx"
import FormField from "../../components/FormField.jsx"

export default function Register() {
    const { usuario, onLogin } = useSession()
    const navigate = useNavigate()
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(registerSchema)
    })

    async function onSubmit(datos) {
        try {
            await userService.saveUser(datos)
            const sesion = await userService.login({ email: datos.email, password: datos.password })
            onLogin(sesion)
            toast.success("¡Cuenta creada! Bienvenido a GALOPÉ")
            navigate("/viajes")
        } catch (error) {
            if (error.status === 400 && error.errors?.length) {
                error.errors.forEach(e => setError(e.campo, { message: e.message }))
            } else {
                toast.error(error.message)
            }
        }
    }

    if (usuario) return <Navigate to="/viajes" replace />

    return (
        <div className="mx-auto max-w-md space-y-8 p-5 pt-10">
            <div className="space-y-3">
                <Eyebrow>Crear cuenta</Eyebrow>
                <h1 className="text-3xl font-medium">Creá tu cuenta y salí a la ruta</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                <FormField id="nombre" label="Nombre" autoComplete="name"
                    error={errors.nombre?.message} {...register("nombre")} />
                <FormField id="username" label="Nombre de usuario" autoComplete="username"
                    error={errors.username?.message} {...register("username")} />
                <FormField id="email" label="Email" type="email" autoComplete="email"
                    error={errors.email?.message} {...register("email")} />
                <FormField id="password" label="Contraseña" type="password" autoComplete="new-password"
                    error={errors.password?.message} {...register("password")} />
                <FormField id="passwordConfirm" label="Confirmar contraseña" type="password" autoComplete="new-password"
                    error={errors.passwordConfirm?.message} {...register("passwordConfirm")} />
                    
                <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
                </Button>
            </form>

            <p className="text-sm text-marron/70">
                ¿Ya tenés cuenta? <Link to="/login" className="font-medium text-marron">Ingresá</Link>
            </p>
        </div>
    )
}