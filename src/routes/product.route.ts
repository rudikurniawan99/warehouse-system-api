import { Router } from "express";
import { createProductHandler, uploadImage } from "../controller/product.controller";
import { adminValidation } from "../middleware/adminValidation";
import upload from "../middleware/upload";
import validateResource from "../middleware/validateResource";
import { createProductSchema } from "../schema/product.schema";

const router = Router()

router.post('/', validateResource(createProductSchema), adminValidation, createProductHandler)
router.post('/upload/:id', upload.single('test'), uploadImage)

export default router