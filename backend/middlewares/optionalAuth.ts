import express from "express";
import passport from "passport";

import { User } from "../types/User";

export const optionalAuth = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    passport.authenticate("jwt", { session: false }, (err: any, user: User) => {
        if (err) return next(err);
        if (user) req.user = user;

        next();
    })(req, res, next);
};
