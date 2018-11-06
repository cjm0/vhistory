
const os = require('os')
const getIp = () => { // 获取本地ip
    var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}

module.exports = {
    base: {
        rootPath: '/',
        fileName: 'dist',
        filePath: 'dist/static',
    },
    dev: {
        useEslint: true,
        host: getIp(),
        port: 3002,
        historyApiFallback: {
            verbose: true, // 激活日志记录
            disableDotRule: true, // 允许使用点
            rewrites: [ // history 模式路由处理
                {from: /\/index/, to: '/index.html'}
            ] 
        },
        proxy: [
            {
                context: ['/v2', '/xw', '/wap', '/information'],
                target: 'https://xwm.jindanlicai.com/',
                changeOrigin: true,
                cookieDomainRewrite:{
                    "*":getIp()
                }
            },
        ]
    }
}
