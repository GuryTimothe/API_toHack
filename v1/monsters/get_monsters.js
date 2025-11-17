const dbMonsters = require('../../proxy/db_monsters');
const { baseUrl } = require('../../app');

/**
 * @openapi
 * /monsters:
 *   get:
 *     summary: Récupère la liste des monstres
 *     description: Retourne une liste paginée de tous les monstres disponibles.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Numéro de page
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Nombre d’éléments par page
 *     responses:
 *       200:
 *         description: Liste paginée des monstres
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 totalMonsters:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       type:
 *                         type: string
 */

module.exports = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const result = await dbMonsters.getAll(page, limit);
  const { page: currentPage, limit: currentLimit, totalMonsters, totalPages, data } = result;

  const monstersWithLinks = data.map(monster => ({
    ...monster,
    _links: {
      self: `${baseUrl}/monsters/${monster.id}`,
    }
  }));

  const response = {
    page: currentPage,
    limit: currentLimit,
    totalMonsters,
    totalPages,
    data: monstersWithLinks,
    _links: {
      self: `${baseUrl}/monsters?page=${currentPage}&limit=${currentLimit}`,
      first: `${baseUrl}/monsters?page=1&limit=${currentLimit}`,
      last: `${baseUrl}/monsters?page=${totalPages}&limit=${currentLimit}`,
      next: currentPage < totalPages ? `${req.baseUrl}/monsters?page=${currentPage+1}&limit=${currentLimit}` : null,
      prev: currentPage > 1 ? `${baseUrl}/monsters?page=${currentPage-1}&limit=${currentLimit}` : null,
    }
  };

  res.json(response);
};
