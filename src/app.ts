import express, {
  type NextFunction,
  type Request,
  type Response,
  type Express,
  urlencoded,
} from "express";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";

import { initPassport } from "./passport.js";
import authRoute from "./routes/auth.route.js";
import { COOKIE_MAX_AGE } from "./contants.js";
import { verifyAuth } from "./middleware/verifyAuth.middleware.js";

const app: Express = express();

app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true, limit: "100kb" }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "some-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: COOKIE_MAX_AGE },
  }),
);

initPassport();
app.use(passport.initialize());
app.use(passport.authenticate("session"));

app.get("/health", (req, res) => {
  res.status(200).json({ message: "OK" });
});
app.use("/auth", authRoute);
app.get("/", (req, res) => {
  res.status(200).json({ logedIn: req.isAuthenticated(), data: req.user });
});
app.get("/me", verifyAuth, (req, res) => {
  res.status(200).json({ user: req.user });
});

export default app;
