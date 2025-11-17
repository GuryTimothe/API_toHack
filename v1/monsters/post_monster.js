const dbMonsters = require('../../proxy/db_monsters');
const { baseUrl } = require('../../app');

module.exports = async (req, res) => {
  const { name, type } = req.body;

  if (!name || !type) {
    return res.status(400).json({
      message: "Nom et type sont requis."
    });
  }

  const newMonster = await dbMonsters.add({ name, type });
  const response = {
    ...newMonster,
    _links: {
      self: `${baseUrl}/monsters/${newMonster.id}`,
      collection: `${baseUrl}/monsters`
    }
  };

  res.status(201).json(response);
};
