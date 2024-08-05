const { getChildrenByFolder } = require("../models/folderFile");

const indexPage = async (req, res) => {
    if (req.isAuthenticated()) {
        const folderFiles = await  getChildrenByFolder(null);
        console.log(folderFiles);
        res.render('home', {folder: folderFiles.children, files: folderFiles.file});
    }
    else {
        res.redirect('/login');
    }
}

module.exports = {
    indexPage
}