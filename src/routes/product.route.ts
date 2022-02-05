import { Router } from "express";
import { createProductHandler } from "../controller/product.controller";
import { adminValidation } from "../middleware/adminValidation";
import validateResource from "../middleware/validateResource";
import { createProductSchema } from "../schema/product.schema";

const router = Router()

router.post('/', validateResource(createProductSchema), adminValidation, createProductHandler)

export default router