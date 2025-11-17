const dbMonsters = require('../../proxy/db_monsters');
const { baseUrl } = require('../../app');

module.exports = async (req, res) => {
  const id = parseInt(req.params.id);
  const monster = await dbMonsters.getById(id);

  if (!monster) {
    return res.status(404).json({ message: "Monstre non trouvé." });
  }

  const response = {
    ...monster,
    _links: {
      self: `${baseUrl}/monsters/${id}`,
      collection: `${baseUrl}/monsters`
    }
  };

  res.json(response);
};
