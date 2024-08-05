const path = require('node:path');
const { getChildrenByFolder, createFolderByName, getParentById, deleteFolderById, editFolderName, uploadFilePath } = require("../model/folderFile");

const indexPage = async (req, res) => {
    if (req.isAuthenticated()) {
        const folderId = parseInt(req.params.id) || null;
        const parentPath = await getParentById(folderId);
        res.locals.currentPath = folderId;
        const folderFiles = await  getChildrenByFolder(folderId);
        res.render('home', {folder: folderFiles.children, files: folderFiles.file, path: parentPath, root: path.join(__dirname, '..')});
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

const editFolderPage = (req, res) => {
    const { parentId, folderName } = req.query;
    const folderId = parseInt(req.params.id);
    res.render('edit-folder', { parentId, folderId, folderName });
}

const editFolder = async (req, res) => {
    const { parentId } = req.query;
    const folderId = parseInt(req.params.id);
    const { 'folder-name': newFolderName } = req.body;
    await editFolderName(folderId, newFolderName);
    if (parentId) {
        res.redirect(`/${parentId}`)
    }
    else {
        res.redirect('/');
    }
}

const uploadFile = async (req, res) => {
    const { originalname, path } = req.file;
    const folderId = parseInt(req.query.parentId) || null;
    await uploadFilePath(originalname, path, folderId)
    if (folderId) {
        res.redirect(`/${folderId}`)
    }
    else {
        res.redirect('/');
    }
}

const downloadFile = (req, res) => {
    console.log(req.query);
    const { filePath } = req.query;
    console.log(filePath);
    res.download(filePath, err => {
        if(err) {
            res.status(404).json({'msg': 'File not found'});
        }
    });
}

module.exports = {
    indexPage,
    createFolder,
    deleteFolder,
    editFolder,
    editFolderPage,
    uploadFile,
    downloadFile
}