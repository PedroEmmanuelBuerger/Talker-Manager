const express = require('express');

const talkerRouter = express.Router();
const { readTalkers } = require('../utils/fsFunctions');

talkerRouter.get('/', async (_req, res) => {
    const talkers = await readTalkers();
    res.status(200).json(talkers);
});

module.exports = talkerRouter;
