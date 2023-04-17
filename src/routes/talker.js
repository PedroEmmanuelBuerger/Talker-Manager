const express = require('express');

const talkerRouter = express.Router();
const { readTalkers, readTalkersId, writeTalkers,
    attTalkers, deleteTalker, rewriteAllTalkers } = require('../utils/fsFunctions');

const patchMiddleware = require('../middlewares/patchMiddle');
const tokkenMiddleware = require('../middlewares/tokenMiddle');
const nameMiddleware = require('../middlewares/nameMiddle');
const ageMiddleware = require('../middlewares/ageMiddle');
const talkMiddleware = require('../middlewares/talkMiddle');
const watchedMiddleware = require('../middlewares/watchedAt');
const rateMiddleware = require('../middlewares/rateMiddle');
const queryMiddleware = require('../middlewares/qMiddle');
const rattSearchMiddleware = require('../middlewares/rateSearchMiddle');
const watQueryMiddleware = require('../middlewares/watchQueryMiddle');

talkerRouter.get('/', async (_req, res) => {
    const talkers = await readTalkers();
    res.status(200).json(talkers);
});

talkerRouter.get('/search', 
tokkenMiddleware, queryMiddleware,
rattSearchMiddleware, watQueryMiddleware, async (req, res) => {
    const result = req.nameQuery;
    return res.status(200).json(result);
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

talkerRouter.put('/:id',
tokkenMiddleware, nameMiddleware, ageMiddleware,
    talkMiddleware, watchedMiddleware, rateMiddleware,
 async (req, res) => {
    const { id } = req.params;
    const newTalker = req.body;
    const attTalker = await attTalkers(id, newTalker);
    if (!attTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    res.status(200).json(attTalker);
});

talkerRouter.delete('/:id', tokkenMiddleware, async (req, res) => {
    const { id } = req.params;
    await deleteTalker(id);
   return res.status(204).json();
});

talkerRouter.patch('/rate/:id', tokkenMiddleware, patchMiddleware, async (req, res) => {
    const { id } = req.params;
    const newRating = req.body.rate;
    const allTalkers = await readTalkers();
    const filteredTalker = allTalkers.find((talker) => talker.id === Number(id));
    filteredTalker.talk.rate = Number(newRating);
    await rewriteAllTalkers(allTalkers);
    console.log(filteredTalker);
    return res.status(204).json();
  });

module.exports = talkerRouter;
