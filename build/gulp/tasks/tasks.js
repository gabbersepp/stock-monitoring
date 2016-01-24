var FTPS = require('ftps');
var gulp = require("gulp");
var config = require("../config");
var minimatch = require("minimatch");
var fs = require("fs");
var path = require("path");
var paths = require("../paths");
var change = require("gulp-change");
var argv = require('yargs').argv;
var runSequence = require("run-sequence");
var debug = require("gulp-debug");

var fileFilter = "./!(node_modules|build|.idea|.git)/**/*.*";

var walk = function(dir) {
    var results = [];
    var list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) results = results.concat(walk(file));
        else results.push(file);
    });
    return results;
};

var applyConfig = function(content) {
    var apiUrl = this.apiUrl;
    var adapterHost = this.adapterHost;
    content = content.replace("{apiUrl}", apiUrl).replace("{adapterHost}", adapterHost);
    return content;
};

gulp.task('__ftp-upload', function(cb) {
    var ftps = new FTPS({
        host: config.deployment.remote.ftp.host,//"",
        port: config.deployment.remote.ftp.port,
        username: config.deployment.remote.ftp.user,
        password: config.deployment.remote.ftp.pw,
        protocol: "ftp",
        escape: true, // optional, used for escaping shell characters (space, $, etc.), default: true
        retries: 2, // Optional, defaults to 1 (1 = no retries, 0 = unlimited retries)
        timeout: 10,
        requiresPassword: true, // Optional, defaults to true
        autoConfirm: true, // Optional, is used to auto confirm ssl questions on sftp or fish protocols, defaults to false,
        additionalLftpCommands : "set sftp:auto-confirm yes;set sftp:connect-program 'ssh.exe';set ssl:verify-certificate no;set ftp:ssl-force true;set ftp:ssl-protect-data true;set ftps:initial-prot E"
    });

    var files = walk(paths.out);//.filter(minimatch.filter(fileFilter, { matchBase: true }));

    // Do some amazing things
    ftps.cd(config.deployment.remote.ftp.baseDir);

    files.forEach(function(file) {
        var dirPath = path.dirname(file);
        // we do not want a message if the directory already exists
        ftps.raw("mkdir -p -f " + dirPath.replace(paths.out.replace("./", ""), ""));
        ftps.addFile(file, file);
    });

    ftps.exec(function(e) {
        console.log(e);
       cb();
    });
});

gulp.task("__modify-config", function() {
    var urls;

    if(argv.prod) {
        urls = config.api.remote;
    } else {
        urls = config.api.local;
    }

    return gulp.src("./config.js")
        .pipe(change(applyConfig.bind(urls)))
        .pipe(gulp.dest(paths.out))
});

gulp.task("__local-upload", function() {
    // copy all files to fs.targetDir
    var targetDir = config.deployment.local.fs.targetDir;

    return gulp.src(paths.out + "**/*.*")
        .pipe(gulp.dest(targetDir));
});

gulp.task("__copy-to-out", function() {
    return gulp.src(fileFilter)
        .pipe(debug())
        .pipe(gulp.dest(paths.out));
});

gulp.task("__clean-out", function() {
    // TODO
    //throw new Error("unimplemented exception");
});

gulp.task('__deploy', function(cb) {
    var args = ["__clean-out", "__copy-to-out", "__modify-config"];

    if(argv.prod) {
        args.push(function() {
            gulp.start("__ftp-upload", cb);
        });
        runSequence.apply(null, args);
    } else {
        args.push("__local-upload");
        args.push(cb);
        runSequence.apply(null, args);
    }
});

gulp.task("deploy-local", function(cb) {
    argv.dev = true;
    argv.prod = false;
    return gulp.start("__deploy", cb);
});

gulp.task("deploy-remote", function(cb) {
    argv.dev = false;
    argv.prod = true;
    return gulp.start("__deploy", cb);
});