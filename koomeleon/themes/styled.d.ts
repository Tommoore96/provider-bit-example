import 'styled-components';
import { ExportedDefaultTheme } from '.';

declare module 'styled-components' {
  export interface DefaultTheme extends ExportedDefaultTheme {}
}
