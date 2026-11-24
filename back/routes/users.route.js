import { Router } from "express"
import * as userController from "../controllers/users.controller.js"
import { validate } from "../middlewares/validate.js"
import { registerSchema, loginSchema } from "../schemas/users.js"

const router = Router()

router.post("/api/usuarios", validate(registerSchema), userController.saveUser)
router.post("/api/usuarios/login", validate(loginSchema), userController.login)

export default router