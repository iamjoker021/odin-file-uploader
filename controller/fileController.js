const { getChildrenByFolder, createFolderByName, getParentById, deleteFolderById } = require("../model/folderFile");

const indexPage = async (req, res) => {
    if (req.isAuthenticated()) {
        const folderId = parseInt(req.params.id) || null;
        const parentPath = await getParentById(folderId);
        res.locals.currentPath = folderId;
        const folderFiles = await  getChildrenByFolder(folderId);
        res.render('home', {folder: folderFiles.children, files: folderFiles.file, path: parentPath});
    }
    else {
        res.redirect('/login');
    }
}

const createFolder = async (req, res) => {
    const { folder_name } = req.body;
    const parentId = parseInt(req.query.parentId) || null;
    await createFolderByName(folder_name, parentId);
    if (parentId) {
        res.redirect(`/${parentId}`)
    }
    else {
        res.redirect('/');
    }
}

const deleteFolder = async (req, res) => {
    const parentId = parseInt(req.query.parentId) || null;
    const folderId = parseInt(req.params.id);
    await deleteFolderById(folderId);
    if (parentId) {
        res.redirect(`/${parentId}`)
    }
    else {
        res.redirect('/');
    }
}

module.exports = {
    indexPage,
    createFolder,
    deleteFolder
}