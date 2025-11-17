const dbUsers = require('../../proxy/db_users');
const { baseUrl } = require('../../app');

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Récupère un utilisateur par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 username:
 *                   type: string
 *                 password:
 *                   type: string
 *       404:
 *         description: Utilisateur non trouvé
 */

module.exports = async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await dbUsers.getById(id);

  if (!user) {
    return res.status(404).json({ message: "Utilisateur non trouvé." });
  }

  const response = {
    ...user,
    _links: {
      self: `${baseUrl}/users/${id}`,
      collection: `${baseUrl}/users`
    }
  };

  res.json(response);
};
