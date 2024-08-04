const prisma = require("../utils/prisma");

const addUserDB = async (username, password) => {
    await prisma.users.create({
        data: {
            username: username,
            password: password
        }
    })
}

module.exports = {
    addUserDB
}