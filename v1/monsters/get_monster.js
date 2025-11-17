const dbMonsters = require('../../proxy/db_monsters');
const { baseUrl } = require('../../app');

/**
 * @openapi
 * /monsters/{id}:
 *   get:
 *     summary: Récupère un monstre par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du monstre
 *     responses:
 *       200:
 *         description: Monstre trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 type:
 *                   type: string
 *       404:
 *         description: Monstre non trouvé
 */

module.exports = async (req, res) => {
  const id = parseInt(req.params.id);
  const monster = await dbMonsters.getById(id);

  if (!monster) {
    return res.status(404).json({ message: "Monstre non trouvé kho, tape bien." });
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
