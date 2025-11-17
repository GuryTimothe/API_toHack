const dbUsers = require('../../proxy/db_users');
const { baseUrl } = require('../../app');

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
