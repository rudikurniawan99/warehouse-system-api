import { Router } from "express";
import { loginUserHandler, registerUserHandler } from "../controller/auth.controller";
import validateResource from "../middleware/validateResource";
import { createUserSchema, loginUserSchema } from "../schema/user.schema";

const router = Router()

router.post('/register', validateResource(createUserSchema), registerUserHandler )
router.post('/login', validateResource(loginUserSchema), loginUserHandler)

export default router