import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Label, Input } from '@rebass/forms';
import { Box, Flex } from 'rebass';
import { submitUser } from '../../store/actions/network/network.actions';

const CreateUser = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch();
  return (
    <Box
      as="form"
      onSubmit={event => {
        event.preventDefault();
        dispatch(submitUser({ email }));
      }}
      py={3}
    >
      <Flex mx={-2} mb={3}>
        <Box width={1 / 1} px={2}>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={event => {
              setEmail(event.target.value);
            }}
          />
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="phone"
            name="phone"
            value={phone}
            onChange={event => {
              setPhone(event.target.value);
            }}
          />
          <Input
            type="submit"
            value="Submit"
            mt={3}
            bg="secondary"
            color="primary"
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default CreateUser;
