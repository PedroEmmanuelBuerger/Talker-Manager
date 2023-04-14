const express = require('express');

const talkerRouter = express.Router();
const { readTalkers, readTalkersId } = require('../utils/fsFunctions');

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

module.exports = talkerRouter;
