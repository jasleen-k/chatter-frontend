import React, { useState } from 'react';
import styled from 'styled-components';
import { IoMdSend } from 'react-icons/io';

const Container = styled('div')({
  alignItems: 'center',
  padding: '1rem 2rem',
  paddingBottom: '0.3rem',
  backgroundColor: '#141113',
});

const Form = styled('form')({
  width: '100%',
  borderRadius: '2rem',
  display: 'flex',
  alignItems: 'center',
  gap: '2rem',
  backgroundColor: ' #242025',
});

const Input = styled('input')({
  width: '90%',
  height: '70%',
  backgroundColor: 'transparent',
  color: '#efd3c8',
  border: 'none',
  paddingLeft: '1rem',
  fontSize: '1rem',
  fontFamily: 'Courier Prime',
  outline: 'none',
});

const Button = styled('button')({
  padding: '0.3rem 2rem',
  borderRadius: '2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#efd3c8',
  border: 'none',
});

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState('');

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg('');
    }
  };

  return (
    <Container>
      <Form onSubmit={(event) => sendChat(event)}>
        <Input
          type="text"
          placeholder="type your message here"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <Button type="submit">
          <IoMdSend fontSize="1rem" />
        </Button>
      </Form>
    </Container>
  );
}
