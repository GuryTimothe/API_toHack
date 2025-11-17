const dbUsers = require('../../proxy/db_users');
const { baseUrl } = require('../../app');

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     security:
 *       - bearerAuth: []   # JWT requis
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
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
 *       400:
 *         description: Nom ou mot de passe manquant
 *       401:
 *         description: JWT manquant ou invalide
 */


module.exports = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Le nom et  le mot de passe sont requis."
    });
  }

  const newUser = await dbUsers.add({ username, password });
  const response = {
    ...newUser,
    _links: {
      self: `${baseUrl}/users/${newUser.id}`,
      collection: `${baseUrl}/users`
    }
  };

  res.status(201).json(response);
};
