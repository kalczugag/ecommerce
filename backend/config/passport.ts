import passport from "passport";
import {
    ExtractJwt,
    Strategy as JWTStrategy,
    StrategyOptionsWithoutRequest,
} from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { UserModel } from "../models/User";
import { RoleModel } from "../models/Role";
import _ from "lodash";

const opts: StrategyOptionsWithoutRequest = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.PUBLIC_KEY!,
    algorithms: ["RS256"],
};

passport.use(
    new JWTStrategy(opts, async (payload, done) => {
        try {
            const user = await UserModel.findById(payload.sub)
                .populate("_role")
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

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: "http://localhost:3000/auth/v1/google/callback",
            scope: ["email", "profile"],
            proxy: true,
        },
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await UserModel.findOne({
                googleId: profile.id,
                email: profile.emails?.[0].value,
            });

            if (existingUser) return done(null, existingUser);

            let defaultRole = await RoleModel.findOne({
                name: "client",
            }).exec();

            if (!defaultRole) {
                defaultRole = await RoleModel.create({
                    name: "client",
                    permissions: ["read"],
                });
            }

            const newUser = new UserModel({
                googleId: profile.id,
                firstName: profile.name?.givenName,
                lastName: profile.name?.familyName,
                email: profile.emails?.[0].value,
                _role: defaultRole._id,
            });

            await newUser.save().catch((err) => done(err, false));

            return done(null, newUser);
        }
    )
);

passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_CLIENT_ID!,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
            callbackURL: "http://localhost:3000/auth/v1/facebook/callback",
        },
        async (accessToken, refreshToken, profile, done) => {}
    )
);
