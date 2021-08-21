import request from '@/utils/request'

export function fetchList(current,limit,blogQuery) {
    return request({
        url: `/frontservice/blogcontent/list/${current}/${limit}`,
        method: 'post',
        data: blogQuery
    })
}
export function fetchById(id) {
    return request({
        url: `/frontservice/blogcontent/listBlogById/${id}`,
        method: 'get',
    })
}

export function getUserName() {
    return request({
        url: `/frontservice/bloguser/getUser`,
        method: 'get',
    })
}

export function getAllClass() {
    return request({
        url: `/frontservice/blogclass/getClass`,
        method: 'get',
    })
}
export function getClassByName(name,current,limit) {
    return request({
        url: `/frontservice/blogcontent/listByClass/${name}/${current}/${limit}`,
        method: 'get',
    })
}
export function getClassBySearch(search,current,limit) {
    return request({
        url: `/frontservice/blogcontent/listBySearch/${search}/${current}/${limit}`,
        method: 'get',
    })
}
export function endMessage(message) {
    return request({
        url: '/frontservice/blogmessage/sendMessage',
        method: 'post',
        data:message
    })
}

export function fetchCategory() {
    return request({
        url: `/frontservice/blogclass/getClass`,
        method: 'get',
    })
}

export function fetchInfo() {
    return request({
        url: '/frontservice/myinfo/myInfo',
        method: 'get',
    })
}

export function fetchSocial() {
    return request({
        url: '/frontservice/blogsocials/getAll',
        method: 'get',
    });
}

export function fetchBanner() {
    return request({
        url: '/frontservice/blogbanner/getBanner',
        method: 'get'
    })
}

export function fetchComment() {
    return request({
        url: '/comment',
        method: 'get',
        params: {}
    })
}
