import { Router } from "express";

import { createAccount, getProfile, login } from "../controllers/user";

const router = Router();

router.post("/register", createAccount);
router.post("/login", login);
router.get("/:id", getProfile);


export default router;
