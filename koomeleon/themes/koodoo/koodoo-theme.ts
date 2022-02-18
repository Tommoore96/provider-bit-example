import { ErrorIcon } from './icons/error';
import { ExportedDefaultTheme } from '../types';
import { ClockIcon } from './icons/clock';

const color1 = '#495CE9';
const color2 = '#FFFFFF';
const color3 = '#EDEFFD';
const color4 = '#C8CEF8';
const color5 = '#FFF6F8';
const color6 = '#FF1F48';
const color7 = '#0F0F0F';
const color8 = '#5F6C8F';
const color9 = '#1F1F1F';
const color10 = '#E2E5ED';

const koodooTheme: ExportedDefaultTheme = {
  colors: {
    background: {
      button: {
        primary: {
          default: color1,
          hover: '#6E7DED',
          active: '#253BE4',
          focusVisible: color1,
        },
        secondary: {
          default: color2,
          hover: color3,
          active: color4,
          focusVisible: color3,
        },
        critical: {
          default: color2,
          hover: color5,
          active: '#FFAAB9',
          focusVisible: color5,
        },
      },
      header: '#FFFFFF',
      progressBar: {
        container: color2,
        barBackground: color3,
        bar: color1,
      },
      radioButton: {
        primary: {
          default: color2,
          error: color2,
          focusWithin: color2,
          active: color4,
          hover: color3,
        },
      },
      toggle: {
        on: {
          default: color1,
          focusVisible: '#6E7DED',
          hover: '#6E7DED',
          active: '#253BE4',
        },
        off: {
          default: color4,
          focusVisible: color3,
          hover: color3,
          active: '#7787EE',
        },
        selector: color2,
      },
    },
    border: {
      radioButton: {
        primary: {
          default: '#D8D9DA',
          error: color6,
          active: color1,
        },
      },
    },
    text: {
      button: {
        primary: {
          default: color2,
        },
        secondary: {
          default: color1,
        },
        critical: {
          default: color6,
        },
      },
      errorMessage: {
        primary: {
          default: color6,
        },
      },
      inputField: {
        inputText: color7,
        placeholderText: '#C7CAD1',
        primaryText: color7,
      },
      progressBar: {
        primary: {
          default: color8,
        },
      },
      radioButton: {
        default: color1,
        error: color6,
        primaryText: color9,
        secondaryText: color8,
        valueText: color9,
        valueLabelText: color8,
      },
      messageCard: '#1F1F1F',
    },
    boxShadow: {
      button: {
        primary: {
          default: '',
          focusVisible: `0px 0px 0px 1px #FFFFFF00 inset, 0px 0px 0px 4px ${color4}`,
        },
        secondary: {
          default: '0px 0px 0px 1px #D8DBE3 inset',
          hover: `0px 0px 0px 1px ${color1} inset`,
          active: `0px 0px 0px 1px ${color1} inset`,
          focusVisible: `0px 0px 0px 1px ${color1} inset, 0px 0px 0px 4px ${color4}`,
        },
        critical: {
          default: '0px 0px 0px 1px #D8DBE3 inset',
          focusVisible: `0px 0px 0px 1px ${color6} inset, 0px 0px 0px 4px ${color4}`,
        },
      },
      inputField: {
        default: `0px 0px 0px 1px ${color10} inset`,
        error: `0px 0px 0px 2px ${color6} inset`,
        focusWithin: `0px 0px 0px 1px ${color1} inset, 0px 0px 0px 4px ${color4}`,
        active: `0px 0px 0px 2px ${color1} inset`,
        hover: '0px 0px 0px 2px #54A0E8 inset',
      },
      radioButton: {
        primary: {
          default: `0px 0px 0px 1px ${color10} inset`,
          error: `0px 0px 0px 2px ${color6} inset`,
          focusWithin: `0px 0px 0px 4px ${color4}, inset 0px 0px 0px 2px ${color1}`,
          active: `0px 0px 0px 2px ${color1} inset`,
          hover: `0px 0px 0px 2px ${color4} inset`,
        },
      },
    },
  },
  fonts: {
    family: 'Jost',
    letterSpacing: {
      radioButton: {
        valueLabelText: '0.2',
      },
    },
    lineHeight: {
      button: {
        small: '24',
        medium: '24',
      },
      errorMessage: '24',
      inputField: '24',
      progressBar: '24',
      radioButton: {
        primaryText: '24',
        secondaryText: '24',
        valueText: '24',
        valueLabelText: '24',
      },
    },
    size: {
      button: {
        small: '16',
        medium: '18',
      },
      errorMessage: '16',
      inputField: '16',
      progressBar: '14',
      radioButton: {
        primaryText: '16',
        secondaryText: '16',
        valueText: '16',
        valueLabelText: '12',
      },
    },
    style: 'normal',
    textTransform: {
      radioButton: {
        valueLabelText: 'uppercase',
      },
    },
    weight: {
      button: {
        small: '600',
        medium: '600',
      },
      errorMessage: '500',
      inputField: '500',
      progressBar: '600',
      radioButton: {
        primaryText: '600',
        secondaryText: 'normal',
        valueText: '500',
        valueLabelText: '500',
      },
    },
  },
  content: {
    borderRadius: {
      button: '6',
      inputField: '6',
      radioButton: '6',
    },
  },
  assets: {
    icons: {
      error: ErrorIcon,
      messageCard: ClockIcon,
    },
  },
  globals: {
    focusVisible: { boxShadow: '0px 0px 0px 4px #C8E4FE' },
  },
};
export { koodooTheme };
