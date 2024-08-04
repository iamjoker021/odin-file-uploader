const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { getUserByUsername } = require('../model/user');
const bycrypt = require('bcryptjs');

passport.use(new LocalStrategy(async (username, password, done) => {
    getUserByUsername(username)
    .then(user => {
        if (!user) {
            return done(null, false, "Username doesn't exists");
        }
        bycrypt.compare(password, user.password)
        .then(match => {
            if(match) {
                done(null, user);
            }
            else {
                done(null, false, "Password does not match")
            }
        })
        .catch((err) => done(err))
    })
    .catch(err => done(err));
}));

passport.serializeUser((user, done) => {
    done(null, user.username);
})

passport.deserializeUser(async (username, done) => {
    try {
        getUserByUsername(username)
        .then(user => {
            if (user) {
                done(null, user)
            }
            else {
                throw new Error('User is not authenticated');
            }
        })
        .catch(err => done(err));
    }
    catch (err) {
        done(err);
    }
})

module.exports = passport;