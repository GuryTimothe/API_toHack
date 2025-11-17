const MOCKED_USER_DB = require('../mockDB/users')
const bcrypt = require('bcryptjs');
const { generateToken} = require('../middlewares/jwt');

function getUserPermissions(user) {
    const permissions = ["read"];
    
    if (user.username === "admin" || user.id === 1) {
        permissions.push("write", "admin", "delete");
    } else if (user.username.includes("moderator")) {
        permissions.push("write", "moderate");
    } else {
        permissions.push("write");
    }
    
    return permissions;
}

const dbUsers = {
    getById: async(id) => {
        return MOCKED_USER_DB.find((m) => m.id === id);
    },
    
    add: async(user) => {
        const hashedPassword = await bcrypt.hash(user.password, 12);
        const newUser = {
            id: MOCKED_USER_DB.length
                ? MOCKED_USER_DB[MOCKED_USER_DB.length - 1].id + 1
                : 1,
            username: user.username,
            password: hashedPassword,
        };
        MOCKED_USER_DB.push(newUser);
        return newUser;
    },
    
    login: async(username, password) => {
        const user = MOCKED_USER_DB.find(u => u.username === username);
    
        if (!user) {
            throw new Error("Utilisateur non trouvé");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Identifiants invalides");
        }

        const userWithPermissions = {
            ...user,
            permissions: getUserPermissions(user)
        };

        const token = generateToken(userWithPermissions);

        return {
            token,
            user: {
                id: user.id,
                username: user.username,
                permissions: userWithPermissions.permissions
            }
        };
    },
    
    
}

module.exports = dbUsers;