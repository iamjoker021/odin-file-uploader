const { getChildrenByFolder, createFolderByName, getParentById } = require("../model/folderFile");

const indexPage = async (req, res) => {
    if (req.isAuthenticated()) {
        const folderId = parseInt(req.params.id) || null;
        const parentPath = await getParentById(folderId);
        res.locals.currentPath = parentPath;
        const folderFiles = await  getChildrenByFolder(folderId);
        res.render('home', {folder: folderFiles.children, files: folderFiles.file});
    }
    else {
        res.redirect('/login');
    }
}

const createFolder = async (req, res) => {
    const { folder_name } = req.body;
    const parentId = null;
    await createFolderByName(folder_name, parentId);
    res.redirect('/');
}

module.exports = {
    indexPage,
    createFolder
}