import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
});

export default function Welcome() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const curUser = async () => {
      if (localStorage.getItem('chat-app-user')) {
        setUserName(
          await JSON.parse(localStorage.getItem('chat-app-user')).username
        );
      }
    };
    curUser().catch(console.error);
  }, []);

  return (
    <Container>
      <h1>welcome {userName}!</h1>
      <h3>select a chat to start!</h3>
    </Container>
  );
}
