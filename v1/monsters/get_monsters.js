const dbMonsters = require('../../proxy/db_monsters');
const { baseUrl } = require('../../app');

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
