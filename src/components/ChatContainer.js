import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ChatInput from '../components/ChatInput';
import { getAllMessagesRoute, sendMessageRoute } from '../utils/api';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const Container = styled('div')({
  display: 'grid',
  gridTemplateRows: '10% 80% 10%',
  overflow: 'hidden',
});

const Header = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const Avatar = styled('div')({
  padding: '7px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '1rem',
});

const AvatarImg = styled('div')({
  padding: '5px 5px',
  height: '20px',
  width: '25px',
  borderRadius: '100px',
  display: 'flex',
  backgroundColor: '#efd3c8',
  justifyContent: 'center',
  color: 'black',
  fontSize: '20px'
});

const MesContainer = styled('div')({
  overflow: 'auto',
});

const ChatMessages = styled.div`
  padding: 1rem 2rem;
  padding-bottom: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .sent {
    justify-content: flex-end;
    .content {
      background-color: #efd3c8;
      color: black;
    }
  }
  .recieved {
    justify-content: flex-start;
    .content {
      background-color: #1c181c;
    }
  }
`;

const Message = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const Content = styled('div')({
  maxWidth: '40%',
  overflowWrap: 'break-word',
  padding: '0 1rem',
  fontSize: '1rem',
  borderRadius: '1rem',
  color: '#d1d1d1',
});

const Input = styled('div')({
  position: 'absolute',
  bottom: '0',
  width: '78%',
  padding: '1rem',
});

function ChatContainer({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    const curChat = async () => {
      if (currentChat) {
        const response = await axios.post(getAllMessagesRoute, {
          from: currentUser.id,
          to: currentChat._id,
        });
        setMessages(response.data);
      }
    };
    curChat().catch(console.error);
  }, [currentChat, currentUser.id]);

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser.id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit('send-msg', {
      to: currentChat._id,
      from: currentUser.id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-recieved', (msg) => {
        setArrivalMessage({ fromSelf: true, message: msg });
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  return (
    <Container>
      <Header>
        <Avatar>
          <AvatarImg>{currentChat.username[0].toUpperCase()}</AvatarImg>
          <p>{currentChat.username}</p>
        </Avatar>
      </Header>
      <MesContainer>
        <ChatMessages>
          {messages.map((message) => {
            return (
              <div key={uuidv4()}>
                <Message
                  className={`${message.fromSelf ? 'sent' : 'recieved'}`}
                >
                  <Content className="content">
                    <p>{message.message}</p>
                  </Content>
                </Message>
              </div>
            );
          })}
        </ChatMessages>
      </MesContainer>
      <Input>
        <ChatInput handleSendMsg={handleSendMsg} />
      </Input>
    </Container>
  );
}

export default ChatContainer;
