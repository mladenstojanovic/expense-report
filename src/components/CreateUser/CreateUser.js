import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { submitUser } from '../../store/actions/network/network.actions';
import { CreateUserStyle } from './CreateUser.style';

const CreateUser = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch();
  return (
    <CreateUserStyle>
      <form
        onSubmit={event => {
          event.preventDefault();
          dispatch(submitUser({ email }));
        }}
      >
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={event => {
            setEmail(event.target.value);
          }}
        />
        <label htmlFor="phone">Phone Number</label>
        <input
          id="phone"
          type="phone"
          name="phone"
          value={phone}
          onChange={event => {
            setPhone(event.target.value);
          }}
        />
        <input
          type="submit"
          value="Submit"
          mt={3}
          bg="secondary"
          color="primary"
        />
      </form>
    </CreateUserStyle>
  );
};

export default CreateUser;
