import { ExportedDefaultTheme } from '@koodoo/koomeleon.themes';

export enum ComponentName {
  INPUT_FIELD = 'inputField',
  BUTTON = 'button',
  ERROR_MESSAGE = 'errorMessage',
  RADIO_BUTTON = 'radioButton',
  PROGRESS_BAR = 'progressBar',
}

export enum ComponentComposition {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
  CRITICAL = 'critical',
  SMALL = 'small',
  MEDIUM = 'medium',
  DEFAULT = 'default',
  ERROR = 'error',
  PRIMARY_TEXT = 'primaryText',
  SECONDARY_TEXT = 'secondaryText',
  VALUE_TEXT = 'valueText',
  VALUE_LABEL_TEXT = 'valueLabelText',
  INPUT_TEXT = 'inputText',
  PLACEHOLDER_TEXT = 'placeholderText',
}

export const GetFontCSSForCustomComposition = (
  theme: ExportedDefaultTheme,
  componentName: ComponentName,
  customComposition: ComponentComposition
) => {
  return `
    font-family: ${theme?.fonts?.family};
    font-size: ${theme?.fonts?.size[componentName][customComposition]}px;
    font-style: ${theme?.fonts?.style};
    font-weight: ${theme?.fonts?.weight[componentName][customComposition]};
    line-height: ${
      theme?.fonts?.lineHeight[componentName][customComposition]
    }px;
    text-transform: ${
      theme?.fonts?.textTransform[componentName] && customComposition
        ? theme?.fonts?.textTransform[componentName][customComposition]
        : 'normal;'
    };
    color: ${theme?.colors?.text[componentName][customComposition]};
  `;
};

export const GetFontCSSForDefaultComposition = (
  theme: ExportedDefaultTheme,
  componentName: ComponentName,
  componentComposition: ComponentComposition
) => {
  return `
    font-family: ${theme?.fonts?.family};
    font-size: ${theme?.fonts?.size[componentName]}px;
    font-style: ${theme?.fonts?.style};
    font-weight: ${theme?.fonts?.weight[componentName]};
    line-height: ${theme?.fonts?.lineHeight[componentName]}px;
    text-transform: ${
      theme?.fonts?.textTransform[componentName] && componentComposition
        ? theme?.fonts?.textTransform[componentName][componentComposition]
        : 'normal;'
    };
    color: ${theme?.colors?.text[componentName][componentComposition]?.default};
  `;
};
