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

const generateToken = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let validateToken = '';
  for (let i = 0; i < 16; i += 1) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    validateToken += characters[randomIndex];
  }
  return validateToken;
};

const writeTalkers = async (newTalkers) => {
  const { name, age, talk } = newTalkers;
  const allTalkers = await fs.readFile(talkerPath);
  const allTalkerJson = JSON.parse(allTalkers);
  const id = allTalkerJson.length + 1;
  const newTalkerObj = {
    name,
    age,
    id,
    talk,
  };
  const allNewTalkers = JSON.stringify([...allTalkerJson, newTalkerObj]);
  await fs.writeFile(path.resolve(__dirname, talkerPath), allNewTalkers);
  return newTalkerObj;
};

const attTalkers = async (id, newTalker) => {
  const allTalkers = await fs.readFile(talkerPath);
  const allTalkerJson = JSON.parse(allTalkers);
  const alteredTalkerIndex = allTalkerJson.findIndex((talker) => talker.id === Number(id));
  if (alteredTalkerIndex === -1) return false;
  const alteredTalkerObj = { ...allTalkerJson[alteredTalkerIndex], ...newTalker };
  const updatedTalkers = [...allTalkerJson];
  updatedTalkers[alteredTalkerIndex] = alteredTalkerObj;
  const updatedTalkersJson = JSON.stringify(updatedTalkers);
  await fs.writeFile(talkerPath, updatedTalkersJson);
  return alteredTalkerObj;
};

const deleteTalker = async (id) => {
const allTalkers = await fs.readFile(talkerPath);
const allTalkerJson = JSON.parse(allTalkers);
const talkersFiltered = allTalkerJson.filter((talker) => talker.id !== Number(id));
const newTalkers = JSON.stringify(talkersFiltered);
await fs.writeFile(talkerPath, newTalkers);
};

const rewriteAllTalkers = async (newTalkers) => {
  const finishTratament = JSON.stringify(newTalkers);
  await fs.writeFile(talkerPath, finishTratament);
};

module.exports = {
readTalkers,
readTalkersId,
generateToken,
writeTalkers,
attTalkers,
deleteTalker,
rewriteAllTalkers,
};