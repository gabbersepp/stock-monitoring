var config = require("../../gulp_config.js");

module.exports = {
    api: {
        local: {
            apiUrl: config.api.local.apiUrl,
            adapterHost: config.api.local.adapterHost
        },
        remote: {
            apiUrl: config.api.remote.apiUrl,
            adapterHost: config.api.remote.adapterHost
        }
    },
    deployment: {
        local: {
            fs: {
                targetDir: config.deployment.local.fs.targetDir
            }
        },
        remote: {
            ftp: {
                host: config.deployment.remote.ftp.host,
                user: config.deployment.remote.ftp.user,
                pw: config.deployment.remote.ftp.pw,
                port: config.deployment.remote.ftp.port,
                baseDir: config.deployment.remote.ftp.baseDir
            }
        }
    }
};