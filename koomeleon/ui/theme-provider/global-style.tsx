import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');

  body {
    font-family: 'Poppins', sans-serif;
  }

  h1 {
    align: center;
    size: 32px;
  }

  h2 {
    align: center;
    size: 24px;
  }

  p {
    size: 16px;
  }

  button, input {
    &:focus-visible {
      box-shadow: ${({ theme }) => theme.globals.focusVisible.boxShadow}
    }
  }
`;
