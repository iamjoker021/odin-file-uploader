const prisma = require("../utils/prisma");

const getChildrenByFolder = async (folderId) => {
    let children;
    if (folderId) {
        children = await prisma.folder.findUnique({
            where: { id: folderId },
            include: { children: true, file: true },
        })
    }
    else {
        children = await prisma.folder.findMany({
            where: { parentId: null },
            include: { children: true, file: true },
        })
    }
    return children[0];
}

module.exports = {
    getChildrenByFolder
}