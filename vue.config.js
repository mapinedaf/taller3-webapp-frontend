

const fs = require('fs');

module.exports = {
    devServer: {
        host:'0.0.0.0',
        https: {
            
            key: fs.readFileSync('/home/tux/SslCertificates/10.244.101.196.key'),
            cert: fs.readFileSync('/home/tux/SslCertificates/10.244.101.196.crt'),
        },
    }
}