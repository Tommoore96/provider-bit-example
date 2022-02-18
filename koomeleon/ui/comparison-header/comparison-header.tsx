import styled from 'styled-components';

export const ComparisonHeader = styled.div`
  display: grid;
  grid-template-areas: 'logo-left logo-right' 'progress-bar progress-bar';
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;

  > svg:first-of-type {
    display: inline-block;
    float: left;
  }

  > svg:second-of-type {
    display: inline-block;
    float: right;
  }

  > div {
    margin-top: 10px;
    grid-area: progress-bar;
  }
`;
