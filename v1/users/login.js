const dbUsers = require('../../proxy/db_users');
const { baseUrl } = require('../../app');
module.exports = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Le nom d'utilisateur et le mot de passe sont requis."
      });
    }

    const result = await dbUsers.login(username, password);
    
    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error("Erreur de connexion:", error);
    res.status(401).json({
      success: false,
      message: error.message
    });
  }
};