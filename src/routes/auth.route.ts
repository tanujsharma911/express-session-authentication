import { Router, type Request, type Response } from "express";
import passport from "passport";

const router: Router = Router();

router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["openid", "profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000",
    failureRedirect: "/login/failed",
  }),
);

export default router;
