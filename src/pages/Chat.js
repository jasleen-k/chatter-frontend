import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/speech.svg';
import axios from 'axios';
import { allUsersRoute, host } from '../utils/api';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import Logout from '../components/Logout';
import { io } from 'socket.io-client';

const Container = styled('div')({
  backgroundImage: 'linear-gradient(to bottom right, #242025, #242025)',
  position: 'fixed',
  top: '0',
  left: '0',
  bottom: '0',
  right: '0',
  overflow: 'hidden',
  color: '#efd3c8',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'top',
  alignItems: 'center',
  height: '100%',
});

const Header = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'left',
  padding: '0px 15px',
  height: '60px',
  width: '98%',
});

const Title = styled('h1')({
  fontSize: '35px',
  padding: '0px 15px',
  fontFamily: 'Courier Prime',
});

const Divider = styled('span')({
  flexGrow: '1',
  borderBottom: '1px solid #efd3c8',
  margin: '5px',
});

const Member = styled('span')({
  padding: '5px',
  fontSize: '15px',
  fontFamily: 'Courier Prime',
});

const Outer = styled('div')({
  height: '100vh',
  width: '100vw',
  backgroundColor: '#00000076',
  display: 'grid',
  gridTemplateColumns: '20% 80%',
});

export default function Chat() {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);

  let navigate = useNavigate();
  const socket = useRef();

  useEffect(() => {
    const curUser = async () => {
      if (!localStorage.getItem('chat-app-user')) {
        navigate('/login');
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')));
      }
    };
    curUser().catch(console.error);
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit('add-user', currentUser.id);
    }
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  useEffect(() => {
    const sync = async () => {
      if (currentUser) {
        const data = await axios.get(`${allUsersRoute}/${currentUser.id}`);
        setContacts(data.data);
      }
    };
    sync().catch(console.error);
  }, [currentUser, navigate]);

  return (
    <Container>
      <Header>
        <img src={Logo} alt="Logo" height="50 rem" />
        <Title> chatter.</Title>
        <Divider></Divider>
        <Member>
          <Logout />
        </Member>
      </Header>
      <Outer>
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {currentChat === undefined ? (
          <Welcome />
        ) : (
          <ChatContainer
            currentChat={currentChat}
            currentUser={currentUser}
            socket={socket}
          />
        )}
      </Outer>
    </Container>
  );
}
