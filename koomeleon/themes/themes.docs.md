---
description: 'Themes object.'
---

## JS Object containing themes

### Example theme

```js
const koodooTheme: DefaultTheme = {
  colors: {
    background: {
      button: {
        primary: {
          default: '#495CE9',
          hover: '#6E7DED',
          active: '#253BE4',
          focusVisible: '#495CE9',
        },
        secondary: {
          default: '#FFFFFF',
          hover: '#EDEFFD',
          active: '#C8CEF8',
          focusVisible: '#EDEFFD',
        },
        critical: {
          default: '#FFFFFF',
          hover: '#FFF6F8',
          active: '#FFAAB9',
          focusVisible: '#FFF6F8',
        },
      },
      header: '',
      progressBar: {
        container: '#FFFFFF',
        barBackground: '#EDEFFD',
        bar: '#495CE9',
      },
      radioButton: {
        primary: {
          default: '#FFFFFF',
          error: '#FFFFFF',
          focusWithin: '#FFFFFF',
          active: '#C8CEF8',
          hover: '#EDEFFD',
        },
      },
      toggle: '#495CE9',
    },
    border: {
      radioButton: {
        primary: {
          default: '#D8D9DA',
          error: '#FF1F48',
          active: '#495CE9'
        }
      }
    },
    text: {
      button: {
        primary: {
          default: '#FFFFFF',
        },
        secondary: {
          default: '#495CE9',
        },
        critical: {
          default: '#FF1F48',
        },
      },
      errorMessage: '#FF1F48',
      inputField: {
        inputText: '#0F0F0F',
        placeholderText: '#C7CAD1',
        primaryText: '#0F0F0F',
      },
      progressBar: '#5F6C8F',
      radioButton: {
        default: '#495CE9',
        error: '#FF1F48',
        primaryText: '#1F1F1F',
        secondaryText: '#5F6C8F',
        valueText: '#1F1F1F',
        valueLabelText: '#5F6C8F',
      },
    },
    boxShadow: {
      button: {
        primary: {
          default: '',
          focusVisible:
            '0px 0px 0px 1px #FFFFFF00 inset, 0px 0px 0px 4px #C8CEF8',
        },
        secondary: {
          default: '0px 0px 0px 1px #D8DBE3 inset',
          hover: '0px 0px 0px 1px #495CE9 inset',
          active: '0px 0px 0px 1px #495CE9 inset',
          focusVisible:
            '0px 0px 0px 1px #495CE9 inset, 0px 0px 0px 4px #C8CEF8',
        },
        critical: {
          default: '',
          focusVisible:
            '0px 0px 0px 1px #FF1F48 inset, 0px 0px 0px 4px #C8CEF8',
        },
      },
      inputField: {
        primary: {
          default: '0px 0px 0px 1px #E2E5ED inset',
          error: '0px 0px 0px 2px #FF1F48 inset',
          focusWithin: '0px 0px 0px 1px #495CE9 inset, 0px 0px 0px 4px #C8CEF8',
          active: '0px 0px 0px 2px #495CE9 inset',
          valid: '0px 0px 0px 1px #E2E5ED inset',
          hover: '0px 0px 0px 2px #54A0E8 inset',
        },
      },
      radioButton: {
        primary: {
          default: '',
          error: '0px 0px 0px 2px #FF1F48 inset',
          focusWithin: '0px 0px 0px 4px #C8CEF8, inset 0px 0px 0px 2px #495CE9',
          active: '0px 0px 0px 2px #495CE9 inset',
          hover: '0px 0px 0px 2px #C8CEF8 inset',
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
  assets: {},
};
```
