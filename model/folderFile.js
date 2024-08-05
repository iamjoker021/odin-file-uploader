const prisma = require("../utils/prisma");

const getChildrenByFolder = async (folderId) => {
    let children = null;
    if (folderId) {
        children = await prisma.folder.findUnique({
            where: { id: folderId },
            include: { children: true, file: true },
        })
    }
    else if (folderId === null){
        children = {
            file: [],
            children: await prisma.folder.findMany({
                where: { parentId: null },
                include: { children: true },
            })
        }
    }
    return children;
}

const createFolderByName = async (folderName, parentId) => {
    await prisma.folder.create({
        data: {
            name: folderName,
            parentId: parentId
        }
    })
}

const getParentById = async (folderId) => {
    if (folderId === null) {
        return [];
    }

    const data = await prisma.folder.findUnique({
        where: { id: folderId },
        select: { parentId: true, name: true }
    })
    return [{id: data.parentId, name: data.name}].concat(await getParentById(data.parentId));
}

const deleteFolderById = async (folderId) => {
    const folder = await prisma.folder.findUnique({
        where: { id: folderId },
        include: {
          children: true,
          file: true,
        },
    })
    
    await prisma.file.deleteMany({
        where: { parentId: folderId },
    });

    for (const child of folder.children) {
        await deleteFolderById(child.id)
    }

    await prisma.folder.delete({
        where: { id: folderId }
    })
}

module.exports = {
    getChildrenByFolder,
    createFolderByName,
    getParentById,
    deleteFolderById
}