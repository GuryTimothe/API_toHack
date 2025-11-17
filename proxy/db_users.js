const MOCKED_USER_DB = require('../mockDB/users')

const dbUsers={
    getById: async(id) => {
    return MOCKED_USER_DB.find((m) => m.id === id);
    },
    add: async(user) => {
    const newUser = {
    id: MOCKED_USER_DB.length
        ? MOCKED_USER_DB[MOCKED_USER_DB.length - 1].id + 1
        : 1,
    ...user,
    };
    MOCKED_USER_DB.push(newUser);
    return newUser;
    },
}

module.exports=dbUsers