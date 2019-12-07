import styled from 'styled-components/macro';

export const TransactionDataSingleStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin-bottom: 30px;

  h1 {
    margin-bottom: 10px;
    color: ${props => props.theme.colors.lightBlue};
  }

  p {
    margin-bottom: 3px;
  }
`;

export const TransactionDataNumbersStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
`;
