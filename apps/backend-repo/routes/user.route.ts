import express from "express";
import IndexController from "../controller";
import AuthMiddleware from "../middleware/auth.middleware";

const router = express.Router();

router.post("/auth/register", new IndexController().registerUser);
router.post("/auth/login", new IndexController().loginUser);
router.put("/update-user-data", new IndexController().updateUserData);

router.get("/fetch-user-data", new AuthMiddleware().authorize, new IndexController().fetchAllUserData);
router.get("/fetch-user-data/me", new AuthMiddleware().authorize, new IndexController().fetchUserData);

export default router;
