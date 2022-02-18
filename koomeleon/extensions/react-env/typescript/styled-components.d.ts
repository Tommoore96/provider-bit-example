import { ExportedDefaultTheme } from '@koodoo/koomeleon.themes';
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme extends ExportedDefaultTheme {}
}
