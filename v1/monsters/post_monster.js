const dbMonsters = require('../../proxy/db_monsters');
const { baseUrl } = require('../../app');

/**
 * @openapi
 * /monsters:
 *   post:
 *     summary: Crée un nouveau monstre
 *     security:
 *       - bearerAuth: []   # JWT requis
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       201:
 *         description: Monstre créé avec succès
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
 *       400:
 *         description: Nom ou type manquant
 *       401:
 *         description: JWT manquant ou invalide
 */

module.exports = async (req, res) => {
  const { name, type } = req.body;

  if (!name || !type) {
    return res.status(400).json({
      message: "Nom et type sont requis, on est pas là à faire une API de con."
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
