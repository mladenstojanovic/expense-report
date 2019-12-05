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

const CreateUser = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch();
  return (
    <CreateUserStyle>
      <CreateUserFormStyle
        onSubmit={event => {
          event.preventDefault();
          dispatch(submitUser({ email }));
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
          onChange={event => {
            setEmail(event.target.value);
          }}
        />
        <CreateUserFormLabelStyle htmlFor="phone">
          Phone Number
        </CreateUserFormLabelStyle>
        <CreateUserFormInputStyle
          id="phone"
          type="phone"
          name="phone"
          value={phone}
          onChange={event => {
            setPhone(event.target.value);
          }}
        />
        <CreateUserFormInputButtonStyle type="submit" value="Submit" />
      </CreateUserFormStyle>
    </CreateUserStyle>
  );
};

export default CreateUser;
