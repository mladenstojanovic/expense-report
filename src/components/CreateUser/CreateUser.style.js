import styled from 'styled-components/macro';

export const CreateUserStyle = styled.div``;

export const CreateUserFormStyle = styled.form`
  display: flex;
  flex-direction: column;
  padding-bottom: 1.25rem;
`;

export const CreateUserFormLabelStyle = styled.label`
  font-size: ${props => props.theme.fonts.sizes.heading};
  margin-bottom: 3px;
`;

export const CreateUserFormInputStyle = styled.input`
  width: 310px;
  height: 30px;
  margin-bottom: 10px;
  padding-left: 15px;
  border: 1px solid
    ${props => (props.error ? 'red' : props.theme.colors.lightBlue)};
  border-left: 4px solid
    ${props => (props.error ? 'red' : props.theme.colors.lightBlue)};
  border-radius: 5px;
  font-size: ${props => props.theme.fonts.sizes.paragraph};
`;

export const CreateUserFormInputButtonStyle = styled.input`
  height: 40px;
  margin-top: 20px;
  background: transparent;
  border: 1px solid ${props => props.theme.colors.lightBlue};
  border-radius: 5px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: border-color 0.3s ease-out, background 0.3s ease-out;

  &:hover {
    background: ${props => props.theme.colors.lightBlue};
    border-color: white;
  }
`;
