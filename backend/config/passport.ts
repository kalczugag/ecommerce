import {
    ExtractJwt,
    Strategy,
    StrategyOptionsWithoutRequest,
} from "passport-jwt";
import passport from "passport";
import { UserModel } from "../models/User";

const opts: StrategyOptionsWithoutRequest = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.PUBLIC_KEY!,
    algorithms: ["RS256"],
};

passport.use(
    new Strategy(opts, async (payload, done) => {
        try {
            const user = await UserModel.findById(payload.sub)
                .populate("role")
                .exec();

            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (error) {
            return done(error, false);
        }
    })
);
