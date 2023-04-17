const talkerDbDescronstc = (talkers) => {
    const newTalkers = talkers.map((talker) => {
        const { name, age, id } = talker;
        const newObj = {
            name,
            age,
            id,
            talk: {
                watchedAt: talker.talk_watched_at,
                rate: talker.talk_rate,
            },
        };
        return newObj;
    });
   return newTalkers;
};

module.exports = talkerDbDescronstc;