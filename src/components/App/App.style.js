import styled from 'styled-components/macro';

export const AppHeaderStyle = styled.div`
  background-color: ${props => props.theme.colors.darkBlue};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

export const AppLogoStyle = styled.img`
  height: 40vmin;
`;
