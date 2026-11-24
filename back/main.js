import "./config.js"
import express from "express"
import cors from "cors"
import { connectDB } from "./db.js"
import { handleError } from "./utils/handleError.js"
import usersRoutes from "./routes/users.route.js"
import tripsRoutes from "./routes/trips.route.js"
import alertsRoutes from "./routes/alerts.route.js"


const app = express()

app.use(cors({
    origin: ["http://localhost:5173", "https://galope-front.vercel.app"]
}));

app.use(express.json())

app.get("/api", (req, res) => {
    res.status(200).json({ message: "API de galope funcionando" })
})

app.use(usersRoutes)
app.use(tripsRoutes)
app.use(alertsRoutes)

app.use((req, res) => {
    res.status(404).json({ message: "Ruta no encontrada" })
})

app.use((error, req, res, next) => {
    if (error.type === "entity.parse.failed") {
        return res.status(400).json({ message: "El cuerpo de la petición no es un JSON válido" })
    }
    handleError(res, error)
})

const PORT = process.env.PORT || 2026

await connectDB()
app.listen(PORT, () => console.log(`Funcionando... http://localhost:${PORT}`))