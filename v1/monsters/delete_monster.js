const dbMonsters = require('../../proxy/db_monsters');

module.exports = async (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = await dbMonsters.delete(id);

  if (!deleted) {
    return res.status(404).json({ message: "Ce monstre n'existe pas" });
  }

  res.status(204).send();
};
