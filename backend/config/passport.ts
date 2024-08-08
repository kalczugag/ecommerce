import {
    ExtractJwt,
    Strategy,
    StrategyOptionsWithoutRequest,
} from "passport-jwt";
import passport from "passport";
import { UserModel } from "@/models/User";

const opts: StrategyOptionsWithoutRequest = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.PUBLIC_KEY!,
    algorithms: ["RS256"],
};

passport.use(
    new Strategy(opts, (payload, done) => {
        UserModel.findOne({ _id: payload.sub })
            .then((user) => {
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            })
            .catch((err) => done(err, null));
    })
);
