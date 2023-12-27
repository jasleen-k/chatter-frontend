import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled('div')({
  display: 'grid',
  gridTemplateRows: '85% 15%',
  overflow: 'hidden',
  background: '#1c181c',
});

const Avatars = styled.div`
  overflow: auto;
  .selected {
    background: #141113;
  }
`;

const Avatar = styled('div')({
  padding: '7px',
  display: 'flex',
  flexDirection: 'row',
  gap: '1rem',
  alignItems: 'center',
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

const Admin = styled('div')({
  position: 'absolute',
  bottom: '0',
});

function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [selected, setSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserName && (
        <Container>
          <Avatars>
            {contacts.map((contact, index) => {
              return (
                <Avatar
                  className={`${selected === index ? 'selected' : ''}`}
                  key={index}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <AvatarImg>{contact.username[0].toUpperCase()}</AvatarImg>
                  <p>{contact.username}</p>
                </Avatar>
              );
            })}
          </Avatars>
          <Admin>
            <Avatar>
              <AvatarImg>{currentUserName[0].toUpperCase()}</AvatarImg>
              <p>{currentUserName}</p>
            </Avatar>
          </Admin>
        </Container>
      )}
    </>
  );
}

export default Contacts;
