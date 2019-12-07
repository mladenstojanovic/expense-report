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

const defaultErrorState = {
  type: '',
  errorText: ''
};

const handleSubmit = (event, email, phone, setError, dispatch) => {
  event.preventDefault();
  if (!email && !phone) {
    setError({
      type: 'all',
      errorText: 'Please enter your email or phone number'
    });
    return;
  }
  if (email && phone && !isPhoneNumberValid(phone) && !isEmailValid(email)) {
    setError({
      type: 'all',
      errorText: 'Email and phone number are invalid'
    });
    return;
  }
  if (phone && !isPhoneNumberValid(phone)) {
    setError({
      type: 'phone',
      errorText: 'Phone number is not valid'
    });
    return;
  }
  if (email && !isEmailValid(email)) {
    setError({ type: 'email', errorText: 'Email is not valid' });
    return;
  }
  dispatch(submitUser({ email }));
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
            value={phone}
            error={error.type === 'phone' || error.type === 'all'}
            onChange={event => {
              if (error.errorText) {
                setError(defaultErrorState);
              }
              setPhone(event.target.value);
            }}
          />
          <CreateUserFormInputButtonStyle type="submit" value="Submit" />
        </CreateUserFormStyle>
      </CreateUserStyle>
      {error.errorText && <p>{error.errorText}</p>}
    </>
  );
};

export default CreateUser;
