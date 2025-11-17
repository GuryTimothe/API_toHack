const dbMonsters = require('../../proxy/db_monsters');
const { baseUrl } = require('../../app');

module.exports = async (req, res) => {
  const id = parseInt(req.params.id);
  const updatedMonster = await dbMonsters.update(id, req.body);

  if (!updatedMonster) {
    return res.status(404).json({ message: "Impossible de modifier, ce monstre n'existe pas." });
  }

  const response = {
    ...updatedMonster,
    _links: {
      self: `${baseUrl}/monsters/${id}`,
      collection: `${baseUrl}/monsters`
    }
  };

  res.json(response);
};
