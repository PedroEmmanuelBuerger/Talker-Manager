const fs = require('fs/promises');
const path = require('path');

const talkerPath = path.resolve(__dirname, '../talker.json');

const readTalkers = async () => {
    const talkers = await fs.readFile(talkerPath);
    return JSON.parse(talkers);
};

const readTalkersId = async (idPar) => {
    const talkers = await fs.readFile(talkerPath);
    const talkerJson = JSON.parse(talkers);
    const filteredId = talkerJson.find((talker) => talker.id === Number(idPar));
    return filteredId;
};

module.exports = {
readTalkers,
readTalkersId,
};