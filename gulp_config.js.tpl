module.exports = {
    api: {
        local: {
            apiUrl: "",
            adapterHost: ""
        },
        remote: {
            apiUrl: "",
            adapterHost: ""
        }
    },
    deployment: {
        local: {
            fs: {
                targetDir: ""
            }
        },
        remote: {
            ftp: {
                host: "",
                user: "",
                pw: "",
                port: 21,
                baseDir: "./"
            }
        }
    }
};