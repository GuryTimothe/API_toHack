const dbMonsters = require('../../proxy/db_monsters');
const { baseUrl } = require('../../app');

/**
 * @openapi
 * /monsters/{id}:
 *   put:
 *     summary: Met à jour un monstre existant
 *     security:
 *       - bearerAuth: []   # JWT requis
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du monstre à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       200:
 *         description: Monstre modifié
 *       404:
 *         description: Monstre non trouvé
 *       401:
 *         description: JWT manquant ou invalide
 */

module.exports = async (req, res) => {
  const id = parseInt(req.params.id);
  const updatedMonster = await dbMonsters.update(id, req.body);

  if (!updatedMonster) {
    return res.status(404).json({ message: "Impossible de modifier, ce monstre n'existe pas mon reuf." });
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
