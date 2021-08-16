import {request} from './request.js';

export function useToLogin(user, pwd){
    return request({
        url: '/userLogin',
        method: 'POST',
        data: {
            user,
            pwd
        }
    })
}

export function getPublishArticle(pageNum, pageSize, type){
    return request({
        url: '/getPublishArticle',
        method: 'GET',
        params: {
            pageNum,
            pageSize,
            type
        }
    })
}

export function getAllArticle(pageNum, pageSize){
    return request({
        url: '/getAllArticle',
        method: 'GET',
        params: {
            pageNum,
            pageSize,
        }
    })
}

export function getSavevArticle(pageNum, pageSize){
    return request({
        url: '/getSavevArticle',
        method: 'GET',
        params: {
            pageNum,
            pageSize,
        }
    })
}

export function changeState(aid, time){
    return request({
        url: '/changeState',
        method: 'POST',
        data: {
            aid,
            time
        }
    })
}

export function uploadImg(formdata){
    return request({
        url: '/uploadImg',
        method: 'POST',
        data: formdata,
    })
}

export function addArticles(title, content, html, type, tags, time, state){
    return request({
        url: '/addArticle',
        method: 'POST',
        data: {
            title,
            content,
            html,
            type,
            tags,
            time,
            state
        }
    })
}

export function addTags(type, value){
    return request({
        url: '/addTags',
        method: 'POST',
        data: {
            type,
            value
        }
    })
}

export function deleteTags(type,tag){
    return request({
        url: '/deleteTags',
        method: 'POST',
        data: {
            type,
            tag
        }
    })
}

export function getTages(){
    return request({
        url: '/getTags',
        method: 'GET'
    })
}

export function deleteArticles(aid){
    return request({
        url: '/deleteArticle',
        method: 'POST',
        data: {
            aid
        }
    })
}

export function updateArticles(aid, title, content, html, type, tags, time, state){
    return request({
        url: '/updateArticle',
        method: 'POST',
        data: {
            aid,
            title,
            content,
            html,
            type,
            tags,
            time,
            state
        }
    })
}

export function insertComments(aid, name, content, time){
    return request({
        url: '/insertComments',
        method: 'POST',
        data: {
            aid,
            name,
            content, 
            time
        }
    })
}

export function getComments(aid){
    return request({
        url: '/getComments',
        method: 'GET',
        params: {
            aid
        }
    })
}

export function getReplyComments(rootid){
    return request({
        url: '/getReplyComments',
        method: 'GET',
        params: {
            rootid
        }
    })
}

export function insertReplyComments(parentid, rootid, replyname, parentname, replytime, replycontent){
    return request({
        url: '/insertReplyComments',
        method: 'POST',
        data: {
            parentid, 
            rootid, 
            replyname, 
            parentname, 
            replytime, 
            replycontent
        }
    })
}

export function deleteReplyComments(replyid){
    return request({
        url: '/deleteReplyComments',
        method: 'POST',
        data: {
            replyid
        }
    })
}

export function deleteComments(comid){
    return request({
        url: '/deleteComments',
        method: 'POST',
        data: {
            comid
        }
    })
}