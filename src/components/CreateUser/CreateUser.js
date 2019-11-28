import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { submitUser } from '../../store/actions/user.actions';

const CreateUser = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  return (
    <div>
      <form
        onSubmit={event => {
          event.preventDefault();
          dispatch(submitUser({ email }));
        }}
      >
        <label>
          email
          <input
            type="text"
            value={email}
            onChange={event => {
              setEmail(event.target.value);
            }}
          />
          <input type="submit" value="Submit" />
        </label>
      </form>
    </div>
  );
};

export default CreateUser;
