let express = require('express');
let router = express.Router();
let api = require('./api.js');
let muluter = require('multer');
let fs = require('fs')

let uploadFile = './upload'
function createFolder(fileName){
    try{
        fs.accessSync(fileName)
        //同步查看操作权限方法
        //accessSync 方法传入一个目录的路径，检查传入路径下的目录是否可读可写，当有操作权限的时候没有返回值，
        //没有权限或路径非法时抛出一个 Error 对象，所以使用时多用 try...catch... 进行异常捕获
    }catch(e){
        fs.mkdirSync(fileName)
        //创建文件目录 mkdirSync 方法参数为一个目录的路径，没有返回值，在创建目录的过程中，
        //必须保证传入的路径前面的文件目录都存在，否则会抛出异常
    }
}
createFolder(uploadFile)
let storage = muluter.diskStorage({
    destination: function(req, file, cb){
        cb(null, uploadFile)
        // 保存的路径，备注：需要自己创建
    },
    filename: function(req, file, cb){
        cb(null,file.fieldname + '-' + Date.now())
        //file 是个文件对象 ,fieldname对应在客户端的name属性,在form表单中指定的name属性值
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
    }
})
let upload = muluter({storage: storage})
// 通过 storage 选项来对上传进行定制

//single(fieldname) 接收单个文件，通过req.file访问该文件
router.post('/uploadImg', upload.single('imgFile'), (req,res) => {
    api.uploadImg(req, res)
})

router.get('/upload/*', (req, res) => {
    api.getImg(req, res)
})

router.post('/userLogin', (req, res, next) => {
    api.userLogin(req, res, next);
})

router.post('/addArticle', (req, res) => {
    api.addArticles(req, res)
})

router.post('/addTags', (req, res) => {
    api.addTags(req, res)
})

router.post('/deleteTags', (req, res) => {
    api.deleteTags(req, res)
})

router.get('/getTags', (req, res) => {
    api.getTags(req, res)
})

router.get('/getPublishArticle', (req, res) => {
    api.getPublishArticle(req, res)
})

router.get('/getAllArticle', (req, res) => {
    api.getAllArticle(req, res)
})

router.get('/getSavevArticle', (req, res) => {
    api.getSavevArticle(req, res)
})

router.post('/changeState', (req, res) => {
    api.changeState(req, res)
})

router.post('/deleteArticle', (req, res) => {
    api.deleteArticles(req, res)
})

router.post('/updateArticle', (req, res) => {
    api.updateArticle(req, res)
})
router.get('/getComments', (req, res) => {
    api.getComments(req, res)
})

router.post('/insertComments', (req, res) => {
    api.insertComments(req, res)
})

router.get('/getReplyComments', (req, res) => {
    api.getReplyComments(req, res)
})

router.post('/insertReplyComments', (req, res) => {
    api.insertReplyComments(req, res)
})

router.post('/deleteReplyComments', (req, res) => {
    api.deleteReplyComments(req, res)
})

router.post('/deleteComments', (req, res) => {
    api.deleteComments(req, res)
})

module.exports = router;