import axios from "./axios.js";

const getindex = (ids) => {
    if (ids != 0) {

        return axios.get(`https://apis.netstart.cn/xmsc/home/page?page_type=activity&page_id=${ids}`)
    } else {
        return axios.get(`https://apis.netstart.cn/xmsc/home/page`)

    }
}

const getfenlei = () => {
    return axios.get("/home/category_v2")
}
const getfenleirght = (id) => {
    return axios.get(`/home/category_v2?cat_id=${id}`)
}

const getbuyitem = (id) => {
    return axios.get(`https://apis.netstart.cn/xmsc/miproduct/view?commodity_id=${id}`)
}



// 搜索建议
const getSearchSuggestion = (text) => {
    return axios.get(`https://apis.netstart.cn/xmsc/hisearch/suggestion_v3?query=${text}`)
}

// 搜索结果
const getSearchOutcome = (text) => {
    return axios.get(`https://apis.netstart.cn/xmsc/hisearch/query_v3?query=${text}`)
}


// 热门搜索

const getHotSearch = () => {
    return axios.get(`https://apis.netstart.cn/xmsc/hisearch/se_default`)
}



export { getfenlei, getindex, getfenleirght, getbuyitem, getSearchSuggestion, getSearchOutcome ,getHotSearch}