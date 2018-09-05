/**
 * 文件描述
 * @author ydr.me
 * @create 2018-09-03 19:36
 * @update 2018-09-03 19:36
 */


'use strict';

var cli = require('blear.node.cli');
var url = require('blear.utils.url');

var portRE = /^[1-9]\d+$/;
var httpRE = /^http(s)?:\/\//;

cli.guess(function (command, args, params) {
    // 指定端口
    if (portRE.test(command)) {
        args.port = command;
    }
    // 指定 https?、域名、端口
    else if (httpRE.test(command)) {
        var pa = url.parse(command);
        args.https = pa.protocol === 'https:';
        args.port = pa.port || (args.https ? '443' : '80');
        args.domain = pa.hostname;
    }
    // 指定域名
    else {
        args.domain = command;
    }

    cli.exec('', args, params);
});




