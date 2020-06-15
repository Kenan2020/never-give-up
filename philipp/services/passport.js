const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy
const mongoose = require('mongoose');
const config = require('config');


const User = mongoose.model('users');


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use('google',
    new GoogleStrategy(
        {
            clientID: config.get('googleClientID'),
            clientSecret: config.get('googleClientSecret'),
            callbackURL: '/auth/google/callback',
            proxy: true
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log(profile._json)
            const existingUser = await User.findOne({ googleId: profile.id });
            if (existingUser) {
                return done(null, existingUser);
            }

            let userData = {
                googleId: profile.id,
                name: profile._json.name,
                picture: profile._json.picture,
                email: profile._json.email
            }

            console.log(userData)

            const user = await new User(userData).save();
            done(null, user);
        }
    )
);


passport.use('facebook', new FacebookStrategy({
    clientID: config.get('facebookclientID'),
    clientSecret: config.get('facebookClientSecret'),
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'email', 'displayName'],
    proxy: true
},

    async (accessToken, refreshToken, profile, done) => {
        console.log(profile)
        const existingUser = await User.findOne({ facebookId: profile.id });
        if (existingUser) {
            return done(null, existingUser);
        }

        let userData = {
            facebookId: profile.id,
            name: profile._json.name,
            picture: profile._json.picture,
            email: profile._json.email
        }

        // console.log(userData)

        const user = await new User(userData).save();
        done(null, user);
    }
)
)