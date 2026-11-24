import { Router } from "express"
import * as tripController from "../controllers/trips.controller.js"
import { validate } from "../middlewares/validate.js"
import { validateToken } from "../middlewares/auth.validate.js"
import { tripSchema } from "../schemas/trips.js"

const router = Router()

//lista viajes 
router.get("/api/viajes", validateToken, tripController.getTrips)
router.get("/api/viajes/:id", validateToken, tripController.getTripById)

//crear un viaje
router.post("/api/viajes", validateToken, validate(tripSchema), tripController.saveTrip)

//editar
router.put("/api/viajes/:id", validateToken, validate(tripSchema), tripController.updateTrip)

//eliminar
router.delete("/api/viajes/:id", validateToken, tripController.deleteTrip)

export default router