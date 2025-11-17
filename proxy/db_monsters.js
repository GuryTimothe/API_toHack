const MOCKED_MONSTER_DB = require('../mockDB/monsters');

const dbMonsters = {
  getAll: async(page, limit) => {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalMonsters = MOCKED_MONSTER_DB.length;
    const totalPages = Math.ceil(totalMonsters / limit);

    const data = MOCKED_MONSTER_DB.slice(startIndex, endIndex);

    return {
      page,
      limit,
      totalMonsters,
      totalPages,
      data,
    };
  },

  getById: async(id) => {
    return MOCKED_MONSTER_DB.find((m) => m.id === id);
  },

  add: async(monster) => {
    const newMonster = {
      id: MOCKED_MONSTER_DB.length
        ? MOCKED_MONSTER_DB[MOCKED_MONSTER_DB.length - 1].id + 1
        : 1,
      ...monster,
    };
    MOCKED_MONSTER_DB.push(newMonster);
    return newMonster;
  },

  update: async(id, updatedMonster) => {
    const index = MOCKED_MONSTER_DB.findIndex((m) => m.id === id);
    if (index === -1) return null;
    MOCKED_MONSTER_DB[index] = { id, ...updatedMonster };
    return MOCKED_MONSTER_DB[index];
  },

  delete: async(id) => {
    const index = MOCKED_MONSTER_DB.findIndex((m) => m.id === id);
    if (index === -1) return false;
    MOCKED_MONSTER_DB.splice(index, 1);
    return true;
  },
};

module.exports = dbMonsters;
