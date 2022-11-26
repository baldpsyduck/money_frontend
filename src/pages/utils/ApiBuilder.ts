import axios from "axios";
// let baseUrl = "http://127.0.0.1:4523/m1/1990943-0-default";
let baseUrl = "http://82.157.154.180:8082";

axios.defaults.withCredentials = true// Cookie跨域
const service = axios.create({
    baseURL: baseUrl, // api 的 base_url
    timeout: 15000, // 请求超时时间
    withCredentials: true,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        // "Access-Control-Allow-Origin":"*"
    },
});

// 导出通用请求axios
export default (opts:any) => {
    const result = service(opts);
    return result;
};
