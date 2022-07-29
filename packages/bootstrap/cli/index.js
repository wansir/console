#!/usr/bin/env node

const yargs = require('yargs');

const { devServer, buildProd, buildDll, buildPlugin } = require('./webpack');
const createPlugin = require('../plugin/createPlugin');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const argv = yargs
  .command(
    'dev',
    'Start development server',
    {
      setAlias: {
        alias: 's',
        default: 'false',
      },
    },
    args => {
      devServer(args.setAlias);
    },
  )
  .command('build:prod', 'Build production', {}, () => {
    buildProd();
  })
  .command(
    'build:dll',
    'Build DLL',
    {
      setAlias: {
        alias: 's',
        default: 'false',
      },
    },
    args => {
      buildDll(args.setAlias);
    },
  )
  .command('create:plugin', 'Create a new plugin', {}, () => {
    createPlugin();
  })
  .command(
    'build:plugin <name>',
    'Build plugin',
    args => {
      return args.option('name', { description: 'Plugin name' });
    },
    args => {
      buildPlugin(args.name);
    },
  )
  .help().argv;
