const baseUrl = process.env.TMDB_BASE_URL;
const Key = process.env.TMDB_KEY;

const getUrl = (endpoint,params) =>{
    const qs= new URLSearchParams(params);
    return `${baseUrl}${endpoint}?api_key=${Key}&${qs}`
}
export default {getUrl};