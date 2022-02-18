import { ExportedDefaultTheme } from '../types';
import { ClockIcon } from './icons/clock';
import { ErrorIcon } from './icons/error';

const green = '#A7D840';
const white = '#FFFFFF';
const offWhite = '#EFEFEF';
const darkBlue = '#233153';
const red = '#E61414';
const dodgerBlue = '#1074D7';
const black = '#000000';
const slateBlue = '#1074D7';
const offBlack = '#1F1F1F';
const lightSlateGrey = '#5F6C8F';
const blue = '#005FB9';
const cornflourBlue = '#9FB9E6';
const lightCyan = '#DBF2FF';

const confusedTheme: ExportedDefaultTheme = {
  colors: {
    background: {
      button: {
        primary: {
          default: green,
          hover: '#C1E378',
          active: '#8BBA26',
        },
        secondary: {
          default: white,
          hover: offWhite,
          active: '#D4D4D4',
        },
        critical: {
          default: white,
          hover: '#FFBFBF',
          active: '#FFE8E8',
        },
      },
      header: '#233153',
      progressBar: {
        container: '#DBF2FF',
        barBackground: cornflourBlue,
        bar: darkBlue,
      },
      radioButton: {
        primary: {
          default: green,
          error: white,
          focusWithin: offWhite,
          active: offWhite,
          hover: offWhite,
        },
      },
      toggle: {
        on: {
          default: dodgerBlue,
          focusVisible: cornflourBlue,
          hover: cornflourBlue,
          active: dodgerBlue,
        },
        off: {
          default: cornflourBlue,
          focusVisible: lightCyan,
          hover: lightCyan,
        },
        selector: white,
      },
    },
    border: {
      radioButton: {
        primary: {
          default: '#D8D9DA',
          error: red,
          active: dodgerBlue,
        },
      },
      summaryCard: '#DFDFDF',
    },
    text: {
      button: {
        primary: {
          default: black,
        },
        secondary: {
          default: black,
        },
        critical: {
          default: red,
        },
      },
      errorMessage: { primary: { default: red } },
      inputField: {
        inputText: black,
        placeholderText: '#9F9F9F',
        primaryText: black,
      },
      progressBar: { primary: { default: darkBlue } },
      radioButton: {
        default: dodgerBlue,
        error: red,
        primaryText: offBlack,
        secondaryText: lightSlateGrey,
        valueText: offBlack,
        valueLabelText: lightSlateGrey,
      },
      messageCard: '#494949',
    },
    boxShadow: {
      button: {
        primary: {
          default: '',
          focusVisible: `0px 0px 0px 4px ${dodgerBlue} inset`,
        },
        secondary: {
          default: `0px 0px 0px 2px ${black} inset`,
          hover: `0px 0px 0px 2px ${black} inset`,
          active: `0px 0px 0px 2px ${black} inset`,
          focusVisible: `0px 0px 0px 2px ${black} inset, 0px 0px 0px 4px ${dodgerBlue}`,
        },
        critical: {
          default: `0px 0px 0px 2px ${red} inset`,
          hover: `0px 0px 0px 2px ${red} inset`,
          active: `0px 0px 0px 2px ${red} inset`,
          focusVisible: `0px 0px 0px 2px ${red} inset, 0px 0px 0px 4px ${dodgerBlue}`,
        },
      },
      inputField: {
        default: '0px 0px 0px 1px #E2E5ED inset',
        error: '0px 0px 0px 2px #DE2828 inset',
        focusWithin: `0px 0px 0px 2px ${blue} inset, 0px 0px 0px 4px #C8E4FE`,
        active: `0px 0px 0px 2px ${blue} inset`,
        valid: `0px 0px 0px 1px ${black} inset`,
        hover: '0px 0px 0px 2px #54A0E8 inset',
      },
      radioButton: {
        primary: {
          default: `inset 0px 0px 0px 2px ${black}`,
          error: `0px 0px 0px 4px ${red}, inset 0px 0px 0px 2px ${black}`,
          focusWithin: `0px 0px 0px 4px ${slateBlue}, inset 0px 0px 0px 2px ${black}`,
          active: `0px 0px 0px 2px ${black} inset`,
          hover: `0px 0px 0px 2px ${black} inset`,
        },
      },
    },
  },
  fonts: {
    family: 'Poppins',
    letterSpacing: {
      radioButton: {
        valueLabelText: '0.2',
      },
    },
    lineHeight: {
      button: {
        small: '24',
        medium: '20',
      },
      errorMessage: '26',
      inputField: '26',
      progressBar: '24',
      radioButton: {
        primaryText: '26',
        secondaryText: '24',
        valueText: '26',
        valueLabelText: '24',
      },
    },
    size: {
      button: {
        small: '16',
        medium: '20',
      },
      errorMessage: '18',
      inputField: '18',
      progressBar: '18',
      radioButton: {
        primaryText: '18',
        secondaryText: '16',
        valueText: '18',
        valueLabelText: '16',
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
        small: '600',
        medium: '600',
      },
      errorMessage: '500',
      inputField: '300',
      progressBar: '600',
      radioButton: {
        primaryText: '500',
        secondaryText: '300',
        valueText: '500',
        valueLabelText: 'normal',
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

export { confusedTheme };
