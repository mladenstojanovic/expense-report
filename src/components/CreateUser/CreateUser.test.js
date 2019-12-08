import React from 'react';
import CreateUser from './CreateUser';
import { fireEvent } from '@testing-library/react';
import { renderWithReduxAndStyles } from '../../utils/utils';
import {
  EMPTY_FORM_ERROR_MESSAGE,
  INVALID_PHONE_AND_EMAIL_MESSAGE,
  INVALID_PHONE_MESSAGE,
  INVALID_EMAIL_MESSAGE
} from './CreateUser.constants';
import theme from '../../styles/theme';
import { submitUser } from '../../store/actions/network/network.actions';

jest.mock('../../store/actions/network/network.actions', () => ({
  submitUser: jest.fn().mockReturnValue({ type: 'TEST' })
}));

describe('Test CreateUser component', () => {
  it('should render correctly', () => {
    const { container } = renderWithReduxAndStyles(<CreateUser />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should display error message when empty form is submitted', () => {
    const { getByTestId } = renderWithReduxAndStyles(<CreateUser />);

    const emailInput = getByTestId('emailInput');
    const phoneInput = getByTestId('phoneInput');
    const submitButton = getByTestId('formSubmit');

    expect(emailInput).toHaveStyleRule(
      'border',
      `1px solid ${theme.colors.lightBlue}`
    );
    expect(phoneInput).toHaveStyleRule(
      'border',
      `1px solid ${theme.colors.lightBlue}`
    );

    fireEvent.click(submitButton);

    const errorMessage = getByTestId('errorMessage');

    expect(emailInput).toHaveStyleRule('border', '1px solid red');
    expect(phoneInput).toHaveStyleRule('border', '1px solid red');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent(EMPTY_FORM_ERROR_MESSAGE);
  });

  it('should display error message when both email and phone number are invalid', () => {
    const { getByTestId } = renderWithReduxAndStyles(<CreateUser />);

    const emailInput = getByTestId('emailInput');
    const phoneInput = getByTestId('phoneInput');
    const submitButton = getByTestId('formSubmit');

    expect(emailInput).toHaveStyleRule(
      'border',
      `1px solid ${theme.colors.lightBlue}`
    );
    expect(phoneInput).toHaveStyleRule(
      'border',
      `1px solid ${theme.colors.lightBlue}`
    );

    fireEvent.change(emailInput, { target: { value: 'bad@email' } });
    fireEvent.change(phoneInput, { target: { value: 'bad phone number' } });
    fireEvent.click(submitButton);

    const errorMessage = getByTestId('errorMessage');

    expect(emailInput).toHaveStyleRule('border', '1px solid red');
    expect(phoneInput).toHaveStyleRule('border', '1px solid red');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent(INVALID_PHONE_AND_EMAIL_MESSAGE);
  });

  it('should display error message when phone number is invalid', () => {
    const { getByTestId } = renderWithReduxAndStyles(<CreateUser />);

    const emailInput = getByTestId('emailInput');
    const phoneInput = getByTestId('phoneInput');
    const submitButton = getByTestId('formSubmit');

    expect(emailInput).toHaveStyleRule(
      'border',
      `1px solid ${theme.colors.lightBlue}`
    );
    expect(phoneInput).toHaveStyleRule(
      'border',
      `1px solid ${theme.colors.lightBlue}`
    );

    fireEvent.change(phoneInput, { target: { value: 'bad phone number' } });
    fireEvent.click(submitButton);

    const errorMessage = getByTestId('errorMessage');

    expect(emailInput).toHaveStyleRule(
      'border',
      `1px solid ${theme.colors.lightBlue}`
    );
    expect(phoneInput).toHaveStyleRule('border', '1px solid red');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent(INVALID_PHONE_MESSAGE);
  });

  it('should display error message when email is invalid', () => {
    const { getByTestId } = renderWithReduxAndStyles(<CreateUser />);

    const emailInput = getByTestId('emailInput');
    const phoneInput = getByTestId('phoneInput');
    const submitButton = getByTestId('formSubmit');

    expect(emailInput).toHaveStyleRule(
      'border',
      `1px solid ${theme.colors.lightBlue}`
    );
    expect(phoneInput).toHaveStyleRule(
      'border',
      `1px solid ${theme.colors.lightBlue}`
    );

    fireEvent.change(emailInput, { target: { value: 'bad@email' } });
    fireEvent.click(submitButton);

    const errorMessage = getByTestId('errorMessage');

    expect(phoneInput).toHaveStyleRule(
      'border',
      `1px solid ${theme.colors.lightBlue}`
    );
    expect(emailInput).toHaveStyleRule('border', '1px solid red');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent(INVALID_EMAIL_MESSAGE);
  });

  it('should clear the error message when you start typing again after getting an error', () => {
    const { getByTestId } = renderWithReduxAndStyles(<CreateUser />);

    const emailInput = getByTestId('emailInput');
    const phoneInput = getByTestId('phoneInput');
    const submitButton = getByTestId('formSubmit');

    expect(emailInput).toHaveStyleRule(
      'border',
      `1px solid ${theme.colors.lightBlue}`
    );
    expect(phoneInput).toHaveStyleRule(
      'border',
      `1px solid ${theme.colors.lightBlue}`
    );

    fireEvent.click(submitButton);

    const errorMessage = getByTestId('errorMessage');

    expect(phoneInput).toHaveStyleRule('border', '1px solid red');
    expect(emailInput).toHaveStyleRule('border', '1px solid red');
    expect(errorMessage).toBeInTheDocument();

    fireEvent.change(phoneInput, { target: { value: 'typing' } });

    expect(phoneInput).toHaveStyleRule(
      'border',
      `1px solid ${theme.colors.lightBlue}`
    );
    expect(emailInput).toHaveStyleRule(
      'border',
      `1px solid ${theme.colors.lightBlue}`
    );
    expect(errorMessage).not.toBeInTheDocument();

    fireEvent.click(submitButton);

    const newErrorMessage = getByTestId('errorMessage');

    expect(phoneInput).toHaveStyleRule('border', '1px solid red');
    expect(newErrorMessage).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: 'typing' } });

    expect(phoneInput).toHaveStyleRule(
      'border',
      `1px solid ${theme.colors.lightBlue}`
    );
    expect(emailInput).toHaveStyleRule(
      'border',
      `1px solid ${theme.colors.lightBlue}`
    );
    expect(newErrorMessage).not.toBeInTheDocument();
  });

  it('should dispatch an action when all data is valid', () => {
    const { getByTestId } = renderWithReduxAndStyles(<CreateUser />);

    const emailInput = getByTestId('emailInput');
    const phoneInput = getByTestId('phoneInput');
    const submitButton = getByTestId('formSubmit');

    fireEvent.change(emailInput, { target: { value: 'good@email.com' } });
    fireEvent.change(phoneInput, { target: { value: '+381641234567' } });
    fireEvent.click(submitButton);

    expect(emailInput).toHaveStyleRule(
      'border',
      `1px solid ${theme.colors.lightBlue}`
    );
    expect(phoneInput).toHaveStyleRule(
      'border',
      `1px solid ${theme.colors.lightBlue}`
    );
    expect(submitUser).toHaveBeenCalledWith({
      email: 'good@email.com',
      phone: '+381641234567'
    });
  });
});
