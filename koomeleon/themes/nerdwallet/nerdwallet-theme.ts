import { ErrorIcon } from '../confused/icons/error';
import { ExportedDefaultTheme } from '../types';
import { ClockIcon } from './icons/clock';

const green = '#008255';
const darkGreen = '#006642';
const offWhite = '#FFF6F8';
const white = '#FFFFFF';
const slateGrey = '#B1B3B5';
const lightGrey = '#D8D9DA';
const royalBlue = '#005FB9';
const lightSkyBlue = '#C8E4FE';
const red = '#DE2828';
const crimson = '#FF1F48';
const black = '#000000';
const offBlack = '#1F1F1F';
const lightSlateGrey = '#5F6C8F';
const skyBlue = '#54A0E8';

const nerdWalletTheme: ExportedDefaultTheme = {
  colors: {
    background: {
      button: {
        primary: {
          default: green,
          hover: darkGreen,
          active: '#40AD87',
          focusVisible: darkGreen,
        },
        secondary: {
          default: white,
          hover: slateGrey,
          active: lightGrey,
          focusVisible: slateGrey,
        },
        critical: {
          default: white,
          hover: '#FFBFBF',
          active: '#FFE8E8',
        },
      },
      header: white,
      progressBar: {
        container: white,
        barBackground: '#F5F5F5',
        bar: royalBlue,
      },
      radioButton: {
        primary: {
          default: white,
          error: white,
          focusWithin: white,
          active: '#DEEFFF',
          hover: lightSkyBlue,
        },
      },
      toggle: {
        on: {
          default: royalBlue,
          focusVisible: '#02143A',
          hover: '#02143A',
          active: royalBlue,
        },
        off: {
          default: lightSkyBlue,
          focusVisible: skyBlue,
          hover: skyBlue,
        },
        selector: white,
      },
      summaryCard: white,
    },
    border: {
      radioButton: {
        primary: {
          default: lightGrey,
          error: red,
          active: royalBlue,
        },
      },
      messageCard: '#D8D9DA',
    },
    text: {
      button: {
        primary: {
          default: white,
        },
        secondary: {
          default: green,
        },
        critical: {
          default: crimson,
        },
      },
      errorMessage: { primary: { default: crimson } },
      inputField: {
        inputText: black,
        placeholderText: slateGrey,
        primaryText: black,
      },
      progressBar: { primary: { default: '#64666A' } },
      radioButton: {
        default: '#005FB9',
        error: crimson,
        primaryText: offBlack,
        secondaryText: lightSlateGrey,
        valueText: offBlack,
        valueLabelText: lightSlateGrey,
      },
      toggle: {
        primary: {
          default: '',
        },
      },
    },
    boxShadow: {
      button: {
        primary: {
          default: '0px 0px 0px 1px #FFFFFF00 inset',
          focusVisible: `0px 0px 0px 1px #FFFFFF00 inset, 0px 0px 0px 2px ${royalBlue}`,
        },
        secondary: {
          default: `0px 0px 0px 1px ${lightGrey} inset`,
          hover: `0px 0px 0px 1px ${lightGrey} inset`,
          active: `0px 0px 0px 1px ${lightGrey} inset`,
          focusVisible: `0px 0px 0px 1px ${lightGrey} inset, 0px 0px 0px 2px ${royalBlue}`,
        },
        critical: {
          default: `0px 0px 0px 1px ${lightGrey} inset`,
          focusVisible: `0px 0px 0px 1px ${lightGrey} inset, 0px 0px 0px 2px ${royalBlue}`,
        },
      },
      inputField: {
        default: `0px 0px 0px 1px ${black} inset`,
        error: `0px 0px 0px 2px ${red} inset`,
        focusWithin: `0px 0px 0px 2px ${royalBlue} inset, 0px 0px 0px 4px ${lightSkyBlue}`,
        active: `0px 0px 0px 2px ${royalBlue} inset`,
        valid: `0px 0px 0px 1px ${black} inset`,
        hover: `0px 0px 0px 2px ${skyBlue} inset`,
      },
      radioButton: {
        primary: {
          default: `0px 0px 0px 1px ${lightGrey} inset`,
          error: `0px 0px 0px 2px ${red} inset`,
          focusWithin: `0px 0px 0px 4px ${lightSkyBlue}, 0px 0px 0px 2px ${royalBlue} inset`,
          active: `0px 0px 0px 2px ${royalBlue} inset`,
          hover: `0px 0px 0px 2px ${skyBlue} inset`,
        },
      },
    },
  },
  fonts: {
    family: 'Gotham, Arial',
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
        primaryText: '18',
        secondaryText: '18',
        valueText: '18',
        valueLabelText: '18',
      },
    },
    size: {
      button: {
        small: '14',
        medium: '16',
      },
      errorMessage: '14',
      inputField: '14',
      progressBar: '14',
      radioButton: {
        primaryText: '14',
        secondaryText: '14',
        valueText: '14',
        valueLabelText: '14',
      },
    },
    style: 'normal',
    textTransform: {
      button: {
        small: 'uppercase',
        medium: 'uppercase',
      },
      radioButton: {
        valueLabelText: 'uppercase',
      },
    },
    weight: {
      button: {
        small: 'bold',
        medium: 'bold',
      },
      errorMessage: 'bold',
      inputField: 'normal',
      progressBar: 'bold',
      radioButton: {
        primaryText: 'bold',
        secondaryText: 'normal',
        valueText: 'bold',
        valueLabelText: 'bold',
      },
    },
  },
  content: {
    borderRadius: {
      button: '0',
      inputField: '0',
      radioButton: '0',
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

export { nerdWalletTheme };
