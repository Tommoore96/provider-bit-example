// Component testing is done through [Jest](https://jestjs.io/) with the default `teambit.react/react`
// environment. You can modify the `jestconfig.js` file to add your own configurations which 
// will then be merged with the default configs set by teambit.
 
// Override the Jest config to ignore transpiling from specific folders
// See the base Jest config: https://bit.dev/teambit/react/react/~code/jest/jest.config.js

// const reactJestConfig = require('@teambit/react/jest/jest.config');
// uncomment the line below and install the package if you want to use this function
// const {
//   generateNodeModulesPattern,
// } = require('@teambit/dependencies.modules.packages-excluder');
// const packagesToExclude = ['@my-org', 'my-package-name'];

// module.exports = {
//   ...reactJestConfig,
//   transformIgnorePatterns: [
//     '^.+\.module\.(css|sass|scss)$',
//     generateNodeModulesPattern({ packages: packagesToExclude }),
//   ],
// };
  