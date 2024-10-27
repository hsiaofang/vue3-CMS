const env = import.meta.env.MODE || 'prod'
const EnvConfig = {
    development: {
        // baseApi: "/api",
        baseApi: "http://127.0.0.1:8000",
        // mockApi: "https://apifoxmock.com/m1/4068509-0-default/api",
        changeOrigin:true
    },
    test: {
        baseApi: "//test.future.com/api",
        // mockApi: "https://apifoxmock.com/m1/4068509-0-default/api",
    },
    production: {
        baseApi: "//future.com/api",
        // mockApi: "https://apifoxmock.com/m1/4068509-0-default/api",
    }
}

export default {
    env,
    ...EnvConfig[env], 
    mock: false,
}