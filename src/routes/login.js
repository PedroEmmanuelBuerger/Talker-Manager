const express = require('express');

const loginRouter = express.Router();

const { generateToken } = require('../utils/fsFunctions');

loginRouter.post('/', (_req, res) => {
    const token = generateToken();
    return res.status(200).json({ token });
});

module.exports = loginRouter;