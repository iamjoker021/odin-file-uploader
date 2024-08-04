const dotenv = require('dotenv').config();
const path = require('node:path');
const express = require('express');
const router = require('./router/router');
const passport = require('./utils/passport');

const session = require('express-session');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const prisma = require('./utils/prisma');

const app = express();

app.use(session({
    cookie: { maxAge: 1 * 60 * 60 * 1000 },
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(
      prisma,
      {
        checkPeriod: 2 * 60 * 1000,
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }
    )
}));
app.use(passport.session());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => { res.locals.currentUser = req.user; next(); });
app.use('/', router);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));