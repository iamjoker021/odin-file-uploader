const dotenv = require('dotenv').config();
const path = require('node:path');
const express = require('express');
const authRouter = require('./router/authRouter');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: true}));

app.use('/', authRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));