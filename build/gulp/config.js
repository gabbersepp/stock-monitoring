module.exports = {
    api: {
        local: {
            apiUrl: "http://localhost/api/",
            adapterHost: "http://localhost/app"
        },
        remote: {
            apiUrl: "http://biehler.morloc.de/signage/api",
            adapterHost: "http://biehler.morloc.de/signage/app"
        }
    },
    deployment: {
        local: {
            fs: {
                targetDir: "./build/deploy"
            }
        },
        remote: {
            ftp: {
                host: "ftp://136.243.232.112",
                user: "test",
                pw: "test",
                port: 21,
                baseDir: "./"
            }
        }
    }
};