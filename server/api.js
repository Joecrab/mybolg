let mysql = require('mysql');
let sqlMap = require('./sqlMap.js');
let jwt = require('jsonwebtoken');
let uuid = require('uuid')
/**
 * JWT(Json Web Token)是一种身份验证及授权方案，简单的说就是调用端调用 api 时，附带上一个由 api 端颁发的 token，以此来验证调用者的授权信息。
 *通过一种加密规则（如 HS256）+ secret 生成一串字符串（token），token 字符串中一般含有过期时间和签名信息，根据签名和过期时间，
 *就可以判断当前 token 是否有效
 */

/*创建连接池
在开发web应用程序时，连接池是一个很重要的概念。
建立一个数据库连接所消耗的性能成本是很高的。
在服务器应用程序中，如果为每一个接收到的客户端请求
都建立一个或多个数据库连接，将严重降低应用程序性能。

因此在服务器应用程序中通常需要为多个数据库连接创建并维护一个连接池，当连接不再需要时，
这些连接可以缓存在连接池中，当接收到下一个客户端请求时，从连接池中取出连接并重新利用，
而不需要再重新建立连接。
*/
const pool = mysql.createPool({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'blog',
    multipleStatements: true    // 多语句查询
});

var commentsAll = []
function getReplyComments(comment){
    pool.getConnection((err, connection) => {
        connection.query(sqlMap.comments.getReplyComments, [comment.comid], (err, result) => {
            if(result){
                comment.reply = result
                commentsAll.push(comment)
            }
            connection.release()
        })
    })
};

module.exports = {
    
    uploadImg(req, res){
        let url = '/api/upload/' + req.file.filename
        res.json({
            status: 'ok',
            url: url
        })
    },

    getImg(req, res){
        //保存完上传的图片，将这个图片再返回给前端，之前的会删掉，这个替换上去
        res.sendFile(__dirname + '/' + req.url)
    },

    userLogin(req, res, next){
        pool.getConnection((err, connection) => {
            let getUserInfo = sqlMap.userLlogin.getUserInfo;
            let user = req.body.user;
            let pwd = req.body.pwd;
            let content = {name: req.body.name};//要生成token的主题信息
            let secretOrPrivateKey = "jwt";//加密的密钥
            let token = jwt.sign(content, secretOrPrivateKey, {
                expiresIn: 60 * 60 * 1  // 设置token1小时过期
            })
            connection.query(getUserInfo, [user], (err, result) =>{
                if(result.length === 0){
                    res.json({
                        status: false,
                        msg: '不存在该用户哟~'
                    });
                }
                else{
                    if(result[0].password !== pwd){
                        res.json({
                            status: false,
                            msg: '密码不正确哟~'
                        });
                    }
                    else{
                        res.json({
                            status: true,
                            msg: '登录成功！',
                            token
                        }); 
                    }
                }
                connection.release();
            })
        })
    },

    //connection.query(sql查询语句，[sql语句中的？]（可选），得到结果的回调函数)
    //得到的结果是个数组
    addTags(req, res){
        pool.getConnection((err, connection) => {
            let type = req.body.type
            let content = req.body.value
            connection.query(sqlMap.tags.insertTags, [type, content], (err, result) => {
                if(result){
                    res.json({
                        type: 'success',
                        msg: '添加成功'
                    })
                }
                else{
                    res.json({
                        type: 'error',
                        msg: '标签已存在'
                    })
                }
                connection.release()
            })
        })
    },

    deleteTags(req, res){
        pool.getConnection((err, connection) => {
            let type = req.body.type;
            let content = req.body.tag;
            connection.query(sqlMap.tags.deleteTags, [type, content],(err, result) => {
                if(result){
                    res.json({
                        type: 'success',
                        msg: '删除成功'
                    })
                }
                else{
                    res.json({
                        type: 'error',
                        msg: '删除失败'
                    })
                }
                connection.release()
            })
        })
    },

    getTags(req, res){
        pool.getConnection((err, connection) => {
            let data = {}
            let p = new Promise((reslove, reject) => {
                connection.query(sqlMap.tags.getDailyTags, (err, result0) => {
                    if(result0){
                        reslove(result0)
                    }
                })
            })
            p.then(result0 => {
                data.dtags = result0;
                return new Promise((reslove, reject) => {
                    connection.query(sqlMap.tags.getStudyTags, (err, result1) => {
                        if(result1){
                            reslove(result1)
                        }
                    })
                })
            })
            .then(result1 => {
                data.stags = result1;
                return new Promise((reslove, reject) => {
                    connection.query(sqlMap.tags.getInterestTags, (err, result2) => {
                        if(result2){
                            reslove(result2)
                        }
                    })
                })
            })
            .then(result2 => {
                data.itags = result2;
                res.json(data)
                connection.release()
            })
        })
    },

    addArticles(req, res){
        pool.getConnection((err, connection) => {
            let data = req.body;
            let title = data.title;
            let content = data.content;
            let html = data.html;
            let type = data.type;
            let tags = data.tags
            let time = data.time;
            let state = data.state;
            let id = uuid.v4()
            connection.query(sqlMap.articles.insertArticles, [id, title, content, html, type, tags, time, 0, state], (err, result) => {
                if(result){
                    if(state == 0){
                        res.json({
                            type: 'success',
                            msg: '保存成功'
                        })
                    }
                    else{
                        res.json({
                            type: 'success',
                            msg: '发布成功'
                        })
                    }
                }
                else{
                    if(state == 0){
                        res.json({
                            type: 'error',
                            msg: '保存失败'
                        })
                    }
                    else{
                        res.json({
                            type: 'error',
                            msg: '发布失败'
                        })
                    }
                }
                connection.release()
            })
        })
    },

    getPublishArticle(req, res){
        pool.getConnection((err, connection) => {
            let data = req.query
            let pageNum = parseInt(data.pageNum)
            let len = parseInt(data.pageSize)
            //超坑一定要将字符变回数字哦，这样才能正确查询
            let start = (pageNum - 1) * len
            let type = data.type
            connection.query(sqlMap.articles.getPublishArticles, [type, start, len], (err, result) => {
                if(result){
                    res.json(result)
                }
                else{
                    console.log('nonono')
                }
                connection.release()
            })
        })
    },

    getAllArticle(req, res){
        pool.getConnection((err, connection) => {
            let data = req.query
            let pageNum = parseInt(data.pageNum)
            let len = parseInt(data.pageSize)
            //超坑一定要将字符变回数字哦，这样才能正确查询
            let start = (pageNum - 1) * len
            let type = data.type
            connection.query(sqlMap.articles.getAllArticles, [start, len], (err, result) => {
                if(result){
                    res.json(result)
                }
                else{
                    console.log('nonono')
                }
                connection.release()
            })
        })
    },

    getSavevArticle(req, res){
        pool.getConnection((err, connection) => {
            let data = req.query
            let pageNum = parseInt(data.pageNum)
            let len = parseInt(data.pageSize)
            //超坑一定要将字符变回数字哦，这样才能正确查询
            let start = (pageNum - 1) * len
            let type = data.type
            connection.query(sqlMap.articles.getSavevArticles, [start, len], (err, result) => {
                if(result){
                    res.json(result)
                }
                else{
                    console.log('savenonono')
                }
                connection.release()
            })
        })
    },

    changeState(req, res){
        pool.getConnection((err, connection) => {
            let aid = req.body.aid
            let time = req.body.time
            connection.query(sqlMap.articles.changeState, [time, aid], (err, result) => {
                if(result){
                    res.json({
                        type: 'success',
                        msg: '发布成功'
                    })
                }
                else{
                    res.json({
                        type: 'error',
                        msg: '发布失败'
                    })
                }
                connection.release()
            })
        })
    },

    deleteArticles(req, res){
        pool.getConnection((err, connection) => {
            let id = req.body.aid
            connection.query(sqlMap.articles.deleteArticles, [id], (err, result) => {
                if(result){
                    res.json({
                        type: 'success',
                        msg: '删除成功'
                    })
                }
                else{
                    res.json({
                        type: 'error',
                        msg: '删除失败'
                    })
                }
                connection.release()
            })
        })
    },

    updateArticle(req, res){
        pool.getConnection((err, connection) => {
            let data = req.body;
            let aid = data.aid;
            let title = data.title;
            let content = data.content;
            let html = data.html;
            let type = data.type;
            let tags = data.tags
            let time = data.time;
            let state = data.state;
            connection.query(sqlMap.articles.updateArticles, [title, content, html, type, tags, time, state, aid], (err, result) => {
                if(result){
                    if(state == 0){
                        res.json({
                            type: 'success',
                            msg: '保存成功'
                        })
                    }
                    else{
                        res.json({
                            type: 'success',
                            msg: '发布成功'
                        })
                    }
                }
                else{
                    if(state == 0){
                        res.json({
                            type: 'error',
                            msg: '保存失败'
                        })
                    }
                    else{
                        res.json({
                            type: 'error',
                            msg: '发布失败'
                        })
                    }
                }
                connection.release()
            })
        })
    },

    getComments(req, res){
        pool.getConnection((err, connection) => {
            let aid = req.query.aid
            connection.query(sqlMap.comments.getComments, [aid], (err, result) => {
                if(result){
                    res.json(result)
                }
                connection.release()
            })
        })
    },
    
    insertComments(req, res){
        pool.getConnection((err, connection) => {
            let comid = "com" + uuid.v4()
            let aid = req.body.aid
            let name = req.body.name
            let content = req.body.content
            let comtime = req.body.time
            connection.query(sqlMap.comments.insertComments, [comid, aid, name, content, comtime], (err, result) => {
                if(result){
                    res.json({
                        type: 'success',
                        msg: '评论成功',
                        comid
                    })
                }
                else{
                    res.json({
                        type: 'danger',
                        msg: '评论失败'
                    })
                }
                connection.release()
            })
        })
    },

    getReplyComments(req, res){
        pool.getConnection((err, connection) => {
            let rootid = req.query.rootid
            connection.query(sqlMap.comments.getReplyComments, [rootid], (err, result) => {
                if(result){
                    res.json(result)
                }
                connection.release()
            })
        })
    },
    
    insertReplyComments(req, res){
        pool.getConnection((err, connection) => {
            let replyid = "comrep" + uuid.v4()
            let parentid = req.body.parentid
            let rootid = req.body.rootid
            let replyname = req.body.replyname
            let parentname = req.body.parentname
            let replytime = req.body.replytime
            let replycontent = req.body.replycontent
            connection.query(sqlMap.comments.insertReplyComments, [replyid, parentid, rootid, replyname, parentname, replytime, replycontent], (err, result) => {
                if(result){
                    res.json({
                        type: 'success',
                        msg: '评论成功',
                        replyid
                    })
                }
                else{
                    res.json({
                        type: 'danger',
                        msg: '评论失败'
                    })
                }
                connection.release()
            })
        })
    },

    deleteReplyComments(req, res){
        pool.getConnection((err, connection) => {
            let replyid = req.body.replyid
            connection.query(sqlMap.comments.deleteReplyComments, [replyid], (err, result) => {
                if(result){
                    res.json({
                        type: 'success',
                        msg: '删除成功'
                    })
                }
                else{
                    res.json({
                        type: 'error',
                        msg: '删除失败'
                    })
                }
                connection.release()
            })
        })
    },

    deleteComments(req, res){
        pool.getConnection((err, connection) => {
            let comid = req.body.comid
            connection.query(sqlMap.comments.deleteComments, [comid, comid], (err, result) => {
                if(result){
                    res.json({
                        type: 'success',
                        msg: '删除成功'
                    })
                }
                else{
                    res.json({
                        type: 'error',
                        msg: '删除失败'
                    })
                }
                connection.release()
            })
        })
    },

    insertTime(req, res){
        pool.getConnection((err, connection) => {
            let time = req.body.date
            console.log(time)
            connection.query(sqlMap.articles.intsertTime, [time], (err, result) => {
                if(result){
                    res.json({
                        statu: true,
                        msg: 'okk'
                    })
                }
                else{
                    res.json({
                        statu: false,
                        msg: 'nonono'
                    })
                }
                connection.release()
            })
        })
    },

    getTime(req, res){
        pool.getConnection((err, connection) => {

            connection.query(sqlMap.articles.getTime, (err, result) => {
                if(result){
                    res.json(result)
                }
                connection.release()
            })
        })
    }
}
