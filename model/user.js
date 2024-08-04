const prisma = require("../utils/prisma");

const addUserDB = async (username, password) => {
    await prisma.users.create({
        data: {
            username: username,
            password: password
        }
    })
}

const getUserByUsername = async (username) => {
    const user = await prisma.users.findUnique({
        where: {
            username: username
        }
    })
    return user;
}

module.exports = {
    addUserDB,
    getUserByUsername
}