const dbUsers = require('../../proxy/db_users');
const { baseUrl } = require('../../app');

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
