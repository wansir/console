const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs-extra');
const copyDirectory = require('./pluginGenerator');

const pluginsDir = path.resolve(process.cwd(), 'plugins');
fs.ensureDirSync(pluginsDir);

async function createPlugin() {
  const { pluginName, language, author, description, keywords, confirm } = await inquirer.prompt([
    {
      type: 'input',
      name: 'pluginName',
      message: 'Plugin Name',
      validate(input) {
        if (!input) {
          return 'Plugin Name is Required!';
        }
        return true;
      },
    },
    {
      type: 'input',
      name: 'displayName',
      message: 'Display Name',
      validate(input) {
        if (!input) {
          return 'Display name is Required!';
        }
        return true;
      },
    },
    {
      type: 'input',
      name: 'description',
      message: 'Description',
    },
    {
      type: 'input',
      name: 'author',
      message: 'Author',
    },
    {
      type: 'list',
      name: 'keywords',
      message: 'Keywords',
      choices: [
        {
          name: 'Performance',
          value: 'Performance',
        },
        {
          name: 'Monitoring',
          value: 'Monitoring',
        },
        {
          name: 'Logging',
          value: 'Logging',
        },
        {
          name: 'Messaging',
          value: 'Messaging',
        },
      ],
    },
    {
      type: 'list',
      name: 'language',
      message: 'Language',
      choices: [
        {
          name: 'JavaScript',
          value: 'js',
        },
        {
          name: 'Typescript',
          value: 'ts',
        },
      ],
    },
    {
      type: 'confirm',
      name: 'confirm',
      message: answer => {
        return `Ensure to create plugin: [${answer.pluginName}] ?`;
      },
    },
  ]);

  if (!confirm) return;

  // fs.mkdirSync(path.resolve(pluginsDir, pluginName));
  const pluginDir = path.resolve(pluginsDir, pluginName);

  const templateDir =
    language === 'ts'
      ? path.resolve(__dirname, './templates/ts')
      : path.resolve(__dirname, './templates/js');

  console.log(templateDir, pluginDir, pluginName);
  copyDirectory({
    path: templateDir,
    target: pluginDir,
    context: { pluginName, author, description, keywords },
  });
}

module.exports = createPlugin;
