import styled from 'styled-components';

const mediumMobileWidth = `@media (min-width: 375px)`
const tabletWidth = `@media (min-width: 768px)`
const laptopWidth = `@media (min-width: 1024px)`
const largeLaptopWidth = `@media (min-width: 1440px)`

const smallMobilePaddingY = '16px'
const mediumMobilePaddingY = '24px'
const tabletPaddingY = '64px'
const laptopPaddingY = '48px'
const largeLaptopPaddingY = '64px'

export const Header = styled.div`
  background-color: ${({ theme }) => theme?.colors?.background?.header || '#f4f6f9'};
  color: ${({ theme }) => theme?.colors?.text?.header};
  display: grid;
  grid-template-areas: 'logo-left logo-right' 'progress-bar progress-bar';
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  padding: 8px ${smallMobilePaddingY} 0 ${smallMobilePaddingY};

  ${mediumMobileWidth} {
    padding: 8px ${mediumMobilePaddingY} 0 ${mediumMobilePaddingY};
  }
  ${tabletWidth} {
    padding: 8px ${tabletPaddingY} 0 ${tabletPaddingY};
  }
  ${laptopWidth} {
    padding: 8px ${laptopPaddingY} 0 ${laptopPaddingY};
  }
  ${largeLaptopWidth} {
    padding: 8px ${largeLaptopPaddingY} 0 ${largeLaptopPaddingY};
  }

  > svg:first-of-type {
    grid-area: logo-left;
    display: inline-block;
    margin-bottom: 8px
  }

  > svg:second-of-type {
    display: inline-block;
    margin-bottom: 8px
  }

  > div {
      padding: 8px ${smallMobilePaddingY};
      transform: translateX(-${smallMobilePaddingY});
    ${mediumMobileWidth} {
      padding: 8px ${mediumMobilePaddingY};
      transform: translateX(-${mediumMobilePaddingY});
    }
    ${tabletWidth} {
      padding: 8px ${tabletPaddingY};
      transform: translateX(-${tabletPaddingY});  
    }
    ${laptopWidth} {
      padding: 8px ${laptopPaddingY};
      transform: translateX(-${laptopPaddingY}); 
    }
    ${largeLaptopWidth} {
      padding: 8px ${largeLaptopPaddingY};
      transform: translateX(-${largeLaptopPaddingY}); 
    }
    padding-bottom: 0;
    grid-area: progress-bar;
    width: 100 %;
  }
`;
