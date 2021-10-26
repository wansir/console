const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs-extra');
const config = require('./plugin-config');

const pluginDir = path.resolve(process.cwd(), 'plugins');
fs.ensureDirSync(pluginDir);

async function createPluginTemplate() {
  const { pluginName, displayName, author, description, keywords, confirm } = await inquirer.prompt([
    {
      type: 'input',
      name: 'pluginName',
      message: 'Plugin Name',
      validate(input) {
        if (!input) {
          return 'Plugin Name is Required!';
        }
        return true;
      }
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
      }
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
          value: 'Performance'
        },
        {
          name: 'Monitoring',
          value: 'Monitoring'
        },
        {
          name: 'Logging',
          value: 'Logging'
        },
        {
          name: 'Messaging',
          value: 'Messaging'
        },
      ],
    },
    {
      type: 'confirm',
      name: 'confirm',
      message: (answer) => {
        return `Ensure to create plugin: [${answer.pluginName}] ?`;
      },
    },
  ]);

  if (!confirm) return;

  fs.mkdirSync(path.resolve(pluginDir, pluginName));
  fs.mkdirSync(path.resolve(pluginDir, pluginName, 'src'));
  fs.mkdirSync(path.resolve(pluginDir, pluginName, 'src', 'routes'));

  // create package.json
  const packageConfig = {
    name: `${config.packageScope}/${pluginName}`,
    displayName,
    description,
    keywords: [keywords],
    author,
    version: '1.0.0',
    ...config.packageJson,
  };
  fs.writeFileSync(path.resolve(pluginDir, pluginName, 'package.json'), JSON.stringify(packageConfig, null, 2));

  // create ReadMe
  const readmeFileName = `README.md`;
  fs.writeFileSync(path.resolve(pluginDir, pluginName, readmeFileName), config.readme(pluginName));

  // create Icon
  const iconFileName = 'icon.svg';
  fs.writeFileSync(path.resolve(pluginDir, pluginName, iconFileName), config.iconTemplate);

  // create index.js
  const entryFileName = `src/index.js`;
  fs.writeFileSync(path.resolve(pluginDir, pluginName, entryFileName), config.indexTemplate(pluginName, displayName));

  // create App.jsx
  const appFileName = `src/App.jsx`;
  fs.writeFileSync(path.resolve(pluginDir, pluginName, appFileName), config.appTemplate(pluginName));

  // create routes
  const routesFileName = 'src/routes/index.js';
  fs.writeFileSync(path.resolve(pluginDir, pluginName, routesFileName), config.routeTemplate(pluginName));

  console.log(
    `Plugin [${pluginName}] successfully created At: ${path.resolve(pluginDir, pluginName)}`
  );
}

module.exports = createPluginTemplate;
