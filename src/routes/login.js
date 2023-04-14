const express = require('express');

const loginRouter = express.Router();

const emailMiddleware = require('../middlewares/emailMiddle');
const passwordMiddleware = require('../middlewares/passwordMiddle');

const { generateToken } = require('../utils/fsFunctions');

loginRouter.post('/', emailMiddleware, passwordMiddleware, (_req, res) => {
    const token = generateToken();
    return res.status(200).json({ token });
});

module.exports = loginRouter;