#!/usr/bin/env node


'use strict';

var cli = require('blear.node.cli');

require('../src/cmds/banner');
require('../src/cmds/root');
require('../src/cmds/version');
require('../src/cmds/guess');

cli.parse({
    bin: 'sts',
    package: require('../package.json')
});
