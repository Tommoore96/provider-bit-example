import { MainRuntime } from '@teambit/cli';
import {
  GeneratorMain,
  GeneratorAspect,
  ComponentContext,
} from '@teambit/generator';
import { ThemeJsonAspect } from './theme-json.aspect';

export class ThemeJsonMain {
  static slots = [];
  static dependencies = [GeneratorAspect];
  static runtime = MainRuntime;
  static async provider([generator]: [GeneratorMain]) {
    /**
     * Array of templates. Add as many templates as you want
     * Separate the templates to multiple files if you prefer
     * Modify, add or remove files as needed
     * See the docs file of this component for more info
     */

    generator.registerComponentTemplate([
      {
        name: 'theme-json',
        description: 'description for theme-json',
        generateFiles: (context: ComponentContext) => {
          return [
            // index file
            {
              relativePath: 'index.js',
              isMain: true,
              content: `module.exports = {
                
              }`,
            },
          ];
        },
      },
    ]);

    return new ThemeJsonMain();
  }
}

ThemeJsonAspect.addRuntime(ThemeJsonMain);
