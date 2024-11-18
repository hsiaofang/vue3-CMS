import axios from 'axios'
import {ElMessage} from 'element-plus'
import config from '@/config'

const service = axios.create({
    baseURL:config.baseApi
})
const NETWORK_EOOR = ' '

service.interceptors.request.use(
    async function (config) {
        return config;
    }, 
    function (error) {
        return Promise.reject(error);
    });

service.interceptors.response.use(
    (res)=>{
        const {code,data,msg} = res.data
        if(code === 200){
            return data
        }else{
            const NETWORK_EOOR = "網路錯誤..."
            ElMessage.error(msg || NETWORK_EOOR)
            return Promise.reject(msg || NETWORK_EOOR)
        }
    }
);

function request(options){
    options.method = options.method || "get"

    // if(option.method.toLowerCase() === "get"){
    //     option.params = option.data
    // }

    // let isMock = config.mock
    // if(typeof options.mock !== "undefinded" ){
    //     isMock = options.mock 
    // }
     
    // if(config.env === 'prod '){
    //     service.defaults.baseURL = config.baseApi 
    // }else{
    //     service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
    // }

    return service(options)
}

export default request