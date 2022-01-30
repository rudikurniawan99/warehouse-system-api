import { Router } from "express";
import { loginUserHandler, refreshAccessTokenHandler, registerUserHandler } from "../controller/auth.controller";
import refreshTokenValidate from "../middleware/refreshTokenValidate";
import validateResource from "../middleware/validateResource";
import { createUserSchema, loginUserSchema } from "../schema/user.schema";

const router = Router()

router.post('/register', validateResource(createUserSchema), registerUserHandler )
router.post('/login', validateResource(loginUserSchema), loginUserHandler)
router.get('/token', refreshTokenValidate, refreshAccessTokenHandler)

export default router