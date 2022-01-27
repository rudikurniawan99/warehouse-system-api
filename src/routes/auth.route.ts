import { Router } from "express";
import { registerUserHandler } from "../controller/auth.controller";
import validateResource from "../middleware/validateResource";
import { createUserSchema } from "../schema/user.schema";

const router = Router()

router.post('/register', validateResource(createUserSchema), registerUserHandler )

export default router