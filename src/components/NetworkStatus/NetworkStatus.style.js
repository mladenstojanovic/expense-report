import styled from 'styled-components/macro';

export const NetworkStatusStyle = styled.div``;

export const NetworkStatusSingleStyle = styled.div`
  display: flex;
  align-items: center;
`;

export const NetworkStatusErrorStyle = styled.h2`
  color: ${props => props.theme.colors.lightBlue};
`;
