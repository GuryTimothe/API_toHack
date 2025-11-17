const dbMonsters = require('../../proxy/db_monsters');

/**
 * @openapi
 * /monsters/{id}:
 *   delete:
 *     summary: Supprime un monstre
 *     security:
 *       - bearerAuth: []   # JWT requis
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du monstre à supprimer
 *     responses:
 *       204:
 *         description: Monstre supprimé avec succès
 *       404:
 *         description: Monstre non trouvé
 *       401:
 *         description: JWT manquant ou invalide
 */

module.exports = async (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = await dbMonsters.delete(id);

  if (!deleted) {
    return res.status(404).json({ message: "Ce monstre n'existe pas" });
  }

  res.status(204).send();
};
