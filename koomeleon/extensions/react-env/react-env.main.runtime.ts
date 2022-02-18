import { MainRuntime } from '@teambit/cli';
import { ReactAspect, ReactMain } from '@teambit/react';
import { EnvsAspect, EnvsMain } from '@teambit/envs';
import { MyReactAspect } from './react-env.aspect';
import type { TypescriptConfigMutator } from '@teambit/typescript';
import { resolve } from 'path';

// import { previewConfigTransformer, devServerConfigTransformer } from './webpack/webpack-transformers';

/**
 * Uncomment to include config files for overrides of Typescript or Webpack
 */
// const tsconfig = require('./typescript/tsconfig');

export class MyReactMain {
  static slots = [];

  static dependencies = [ReactAspect, EnvsAspect];

  static runtime = MainRuntime;

  static async provider([react, envs]: [ReactMain, EnvsMain]) {
    // console.log(process.env)
    const overrides = [
      /**
       * Uncomment to override the config files for TypeScript, Webpack or Jest
       * Your config gets merged with the defaults
       */

      // Override the TS config to propagate the theme types across all components
      react.useTypescript({
        buildConfig: [
          (config: TypescriptConfigMutator) => {
            config.addTypes([
              resolve(__dirname, './typescript/styled-components.d.ts'),
            ]);

            return config;
          },
        ],
      }),
      // react.useWebpack({
      //   previewConfig: [previewConfigTransformer],
      //   devServerConfig: [devServerConfigTransformer],
      // }),
      // react.overrideJestConfig(require.resolve('./jest/jest.config')),

      /**
       * override the ESLint default config here then check your files for lint errors
       * @example
       * bit lint
       * bit lint --fix
       */
      react.useEslint({
        transformers: [
          (config) => {
            config.setRule('no-console', ['error']);
            return config;
          },
        ],
      }),

      /**
       * override the Prettier default config here the check your formatting
       * @example
       * bit format --check
       * bit format
       */
      react.usePrettier({
        transformers: [
          (config) => {
            config.setKey('tabWidth', 2);
            return config;
          },
        ],
      }),

      /**
       * override dependencies here
       * @example
       * Uncomment types to include version 17.0.3 of the types package
       */
    ];
    if (process.env['ENV'] !== 'local') {
      overrides.push(
        react.overrideDependencies({
          peerDependencies: {
            'styled-components': {
              version: '5.3.3',
              resolveFromEnv: true,
            },
            '@testing-library/react': {
              version: '^12.0.0',
              resolveFromEnv: true,
            },
          },
        })
      );
    }

    const templatesReactEnv = envs.compose(react.reactEnv, overrides);

    envs.registerEnv(templatesReactEnv);
    return new MyReactMain();
  }
}

MyReactAspect.addRuntime(MyReactMain);