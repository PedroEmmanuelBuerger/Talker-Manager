const express = require('express');

const talkerRouter = express.Router();
const { readTalkers, readTalkersId, writeTalkers } = require('../utils/fsFunctions');

const tokkenMiddleware = require('../middlewares/tokenMiddle');
const nameMiddleware = require('../middlewares/nameMiddle');
const ageMiddleware = require('../middlewares/ageMiddle');
const talkMiddleware = require('../middlewares/talkMiddle');
const watchedMiddleware = require('../middlewares/watchedAt');
const rateMiddleware = require('../middlewares/rateMiddle');

talkerRouter.get('/', async (_req, res) => {
    const talkers = await readTalkers();
    res.status(200).json(talkers);
});

talkerRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const talkerById = await readTalkersId(id);
    if (talkerById) {
      return res.status(200).json(talkerById);
    }
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

talkerRouter.post('/',
    tokkenMiddleware, nameMiddleware, ageMiddleware,
    talkMiddleware, watchedMiddleware, rateMiddleware,
 async (req, res) => {
    const newTalker = req.body;
    const newTalkerJson = await writeTalkers(newTalker);
    res.status(201).json(newTalkerJson);
});

module.exports = talkerRouter;
