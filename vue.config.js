module.exports = {
    devServer: {
        proxy: {
            '/api': { //用 /api 代替 服务器http://localhost:3000/api
                target: 'http://localhost:3000/api', //本地服务器地址开放的是3000端口
                changeOrigin: true, //這裡true表示实现跨域
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}