import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { submitUser } from '../../store/actions/network/network.actions';
import {
  CreateUserStyle,
  CreateUserFormInputButtonStyle,
  CreateUserFormStyle,
  CreateUserFormInputStyle,
  CreateUserFormLabelStyle
} from './CreateUser.style';
import { isPhoneNumberValid, isEmailValid } from '../../utils/utils';
import {
  TYPE_ALL,
  EMPTY_FORM_ERROR_MESSAGE,
  INVALID_PHONE_AND_EMAIL_MESSAGE,
  TYPE_PHONE,
  INVALID_PHONE_MESSAGE,
  TYPE_EMAIL,
  INVALID_EMAIL_MESSAGE
} from './CreateUser.constants';

const defaultErrorState = {
  type: '',
  errorText: ''
};

export const handleSubmit = (event, email, phone, setError, dispatch) => {
  event.preventDefault();
  if (!email && !phone) {
    setError({
      type: TYPE_ALL,
      errorText: EMPTY_FORM_ERROR_MESSAGE
    });
    return;
  }
  if (email && phone && !isPhoneNumberValid(phone) && !isEmailValid(email)) {
    setError({
      type: TYPE_ALL,
      errorText: INVALID_PHONE_AND_EMAIL_MESSAGE
    });
    return;
  }
  if (phone && !isPhoneNumberValid(phone)) {
    setError({
      type: TYPE_PHONE,
      errorText: INVALID_PHONE_MESSAGE
    });
    return;
  }
  if (email && !isEmailValid(email)) {
    setError({ type: TYPE_EMAIL, errorText: INVALID_EMAIL_MESSAGE });
    return;
  }
  dispatch(submitUser({ email, phone }));
};

const CreateUser = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(defaultErrorState);
  const dispatch = useDispatch();
  return (
    <>
      <CreateUserStyle>
        <CreateUserFormStyle
          onSubmit={event => {
            handleSubmit(event, email, phone, setError, dispatch);
          }}
        >
          <CreateUserFormLabelStyle htmlFor="email">
            Email
          </CreateUserFormLabelStyle>
          <CreateUserFormInputStyle
            id="email"
            type="email"
            name="email"
            data-testid="emailInput"
            value={email}
            error={error.type === 'email' || error.type === 'all'}
            onChange={event => {
              if (error.errorText) {
                setError(defaultErrorState);
              }
              setEmail(event.target.value);
            }}
          />
          <CreateUserFormLabelStyle htmlFor="phone">
            Phone Number
          </CreateUserFormLabelStyle>
          <CreateUserFormInputStyle
            id="phone"
            type="tel"
            name="phone"
            data-testid="phoneInput"
            value={phone}
            error={error.type === 'phone' || error.type === 'all'}
            onChange={event => {
              if (error.errorText) {
                setError(defaultErrorState);
              }
              setPhone(event.target.value);
            }}
          />
          <CreateUserFormInputButtonStyle
            type="submit"
            value="Submit"
            data-testid="formSubmit"
          />
        </CreateUserFormStyle>
      </CreateUserStyle>
      {error.errorText && <p data-testid="errorMessage">{error.errorText}</p>}
    </>
  );
};

export default CreateUser;
