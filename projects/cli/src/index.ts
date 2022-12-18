#! /usr/bin/env node

import { Command } from 'commander';
import startCommand from './commands/start';

const { description, version } = require('../../../package.json');

const program = new Command();

program.description(description).version(version, '-v, -version');

program
  .command('start')
  .argument('[name]')
  .description('start a quiz')
  .action((name) => startCommand.run(name));

program.parse(process.argv);
