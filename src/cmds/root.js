/**
 * 文件描述
 * @author ydr.me
 * @create 2018-09-03 19:36
 * @update 2018-09-03 19:36
 */


'use strict';


var cli = require('blear.node.cli');
var system = require('blear.node.system');
var console = require('blear.node.console');
var open = require('open');

var server = require('../libs/server');

cli
    .command()
    .usage('sts [options]', '随机端口在当前目录启动一个静态服务器')
    .usage('sts <port> [options]', '指定端口在当前目录启动一个静态服务器')
    .usage('sts <origin>', '指定协议、域名、端口在当前目录启动一个静态服务器')
    .option('port', {
        alias: 'p',
        description: '指定端口（默认随机端口）',
        default: '0'
    })
    .option('https', {
        alias: 's',
        description: '使用 HTTPS 协议打开（默认 443 端口）',
        type: 'boolean'
    })
    .option('domain', {
        alias: 'd',
        description: '绑定指定的域名（默认局域网 IP）'
    })
    .helper()
    .versioning()
    .action(function (args, params) {
        if (args.https && args.port === '0') {
            args.port = '443';
        }

        var webroot = process.cwd();
        server(webroot, args.port, function (err) {
            if (err) {
                console.errorWithTime(err.message);
                return process.exit(1);
            }

            var port = this.address().port;
            var domain = args.domain || system.localIP();
            var secure = args.https ? 's' : '';
            var url = 'http' + secure + '://' + domain + ':' + port + '/';

            console.infoWithTime('a STatic Server is running.');
            console.infoWithTime('webroot', webroot);
            console.infoWithTime('homeurl', url);
            open(url);
        });
    });





