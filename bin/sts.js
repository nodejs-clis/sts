#!/usr/bin/env node


'use strict';

var cli = require('blear.node.cli');

cli.banner('');

require('../src/cmds/root');
require('../src/cmds/version');
require('../src/cmds/guess');

cli.parse({
    bin: 'sts',
    package: require('../package.json')
});
