import "dotenv/config"

const requeridas = ["MONGO_URI", "DB_NAME", "JWT_SECRET"]
const faltan = requeridas.filter(nombre => !process.env[nombre])

if (faltan.length > 0) {
    console.error(`Faltan variables de entorno en back/.env: ${faltan.join(", ")}`)
    process.exit(1)
}