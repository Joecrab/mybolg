let sqlMap = {
    userLlogin: {
        getUserInfo: "SELECT * FROM user WHERE username = ?"
    },
    articles: {
        insertArticles: "INSERT INTO articles(a_id,title,summary,html,type,tags,post_time,comnum,state) VALUES(?,?,?,?,?,?,?,?,?)",
        intsertTime: "INSERT INTO time(posttime) VALUES(?)",
        getTime: "SELECT * FROM time",
        getPublishArticles: 'SELECT SQL_CALC_FOUND_ROWS * from articles WHERE type = ? AND state = 1 order by post_time DESC limit ?, ?;SELECT FOUND_ROWS() as count',
        //其中SQL_CALC_FOUND_ROWS 告诉MySQL将sql所处理的行数记录下来，FOUND_ROWS() 则取到了这个纪录
        getAllArticles: 'SELECT SQL_CALC_FOUND_ROWS * from articles WHERE state = 1 order by type limit ?, ?;SELECT FOUND_ROWS() as count',
        getSavevArticles: 'SELECT SQL_CALC_FOUND_ROWS * from articles WHERE state = 0 order by post_time DESC limit ?, ?;SELECT FOUND_ROWS() as count',
        changeState: 'UPDATE articles SET state = 1,post_time = ? WHERE a_id = ?',
        deleteArticles: 'DELETE FROM articles WHERE a_id = ?',
        updateArticles: 'UPDATE articles SET title = ?,summary = ?,html = ?,type = ?,tags = ?,post_time = ?,state = ? WHERE a_id = ?'
    },
    tags: {
        getDailyTags: 'SELECT tagcontent FROM tags Where type = "daily"',
        getInterestTags: 'SELECT tagcontent FROM tags Where type = "interest"',
        getStudyTags: 'SELECT tagcontent FROM tags Where type = "study"',
        insertTags: "INSERT INTO tags(type,tagcontent) VALUES(?,?)",
        deleteTags: "DELETE FROM tags WHERE type=? AND tagcontent=?"
    },
    comments: {
        getComments: "SELECT * FROM comments WHERE aid = ? order by comtime DESC",
        insertComments: "INSERT INTO comments(comid,aid,diyname,comcontent,comtime) VALUES(?,?,?,?,?)",
        deleteComments: "DELETE FROM comments WHERE comid = ?;DELETE FROM replycomments WHERE rootid = ?",
        getReplyComments: "SELECT * FROM replycomments WHERE rootid = ? order by replytime DESC",
        insertReplyComments: "INSERT INTO replycomments(replyid,parentid,rootid,replyname,parentname,replytime,replycontent) VALUES(?,?,?,?,?,?,?)",
        deleteReplyComments: "DELETE FROM replycomments WHERE replyid = ?"
    }
}

module.exports =sqlMap;