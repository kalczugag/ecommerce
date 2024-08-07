import {
    ExtractJwt,
    Strategy,
    StrategyOptionsWithoutRequest,
} from "passport-jwt";
import passport from "passport";
import { User } from "@/models/User";

const opts: StrategyOptionsWithoutRequest = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.PRIVATE_KEY!,
};

passport.use(
    new Strategy(opts, (jwt_payload, done) => {
        User.findOne({ _id: jwt_payload.sub }, (err: any, user: any) => {
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
