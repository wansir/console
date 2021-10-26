const yargs = require('yargs');
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs-extra');
const createPlugin = require('./plugin/create-plugin');

const pluginsDir = path.resolve(process.cwd(), 'plugins');
const publishDir = path.resolve(process.cwd(), 'server/public/plugins');

const argv = yargs
  .command('create', 'Create a new plugin', (yargs) => {
    yargs;
  }, (argv) => {
    createPlugin();
  })
  .command(
    'build <name>',
    'Build plugin',
    (yargs) => { return yargs.option('name', { description: 'Plugin name' })},
    (argv) => {
    const pluginDir = path.resolve(pluginsDir, argv.name);
    const process = exec('npm run build', { cwd: pluginDir });
    process.stdout.on('data', data => {
      console.log(data);
    });
  })
  .command(
    'publish <name>',
    'Publish plugin',
    (yargs) => { return yargs.option('name', { description: 'Plugin name' })},
    (argv) => {
      const pluginDir = path.resolve(pluginsDir, argv.name);
      const destDir = path.resolve(publishDir, argv.name);
      // fs.pathExistsSync(path.resolve(pluginDir, './dist/s.g'), (err, exists) => {
      //   console.log(err, exists);
      // });
      fs.emptyDirSync(destDir);
      fs.copySync(pluginDir, destDir);
      console.log('publish success');
    })
  .help().argv;
