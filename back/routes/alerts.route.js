import { Router } from "express"
import * as alertController from "../controllers/alerts.controller.js"
import { validate } from "../middlewares/validate.js"
import { validateToken } from "../middlewares/auth.validate.js"
import { alertSchema, alertUpdateSchema } from "../schemas/alerts.js"

const router = Router()


//lista de avisos activos, uno solo por id
router.get("/api/avisos", validateToken, alertController.getAlerts)
router.get("/api/avisos/:id", validateToken, alertController.getAlertById)

//publicar un aviso
router.post("/api/avisos", validateToken, validate(alertSchema), alertController.saveAlert)

// confirmar un aviso
router.post("/api/avisos/:id/confirmaciones", validateToken, alertController.confirmAlert)

// editar descricpion de aviso
router.patch("/api/avisos/:id", validateToken, validate(alertUpdateSchema), alertController.updateAlert)

// Eliminar
router.delete("/api/avisos/:id", validateToken, alertController.deleteAlert)

export default router