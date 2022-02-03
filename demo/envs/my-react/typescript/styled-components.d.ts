import { ExportedDefaultTheme } from '@tommoore96/provider-example.themes';

import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme extends ExportedDefaultTheme {}
}
