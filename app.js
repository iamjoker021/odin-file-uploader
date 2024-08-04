const dotenv = require('dotenv').config();
const express = require('express');

const app = express();

app.get('/', (req, res) => res.json({'msg': 'working'}));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));