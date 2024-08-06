import {
    ExtractJwt,
    Strategy,
    StrategyOptionsWithoutRequest,
} from "passport-jwt";
import passport from "passport";
import { User } from "../models/User";

const opts: StrategyOptionsWithoutRequest = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.PUBLIC_KEY!,
    algorithms: ["RS256"],
};

passport.use(
    new Strategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.sub, (err: any, user: any) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    })
);
