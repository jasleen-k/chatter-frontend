import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled('button')({
  backgroundColor: 'transparent',
  backgroundRepeat: 'no-repeat',
  border: 'none',
  cursor: 'pointer',
  overflow: 'hidden',
  outline: 'none',
  fontSize: '15px',
  fontFamily: 'Courier Prime',
  color: '#efd3c8',
});

export default function Logout() {
  let navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.clear();
    navigate('/login');
  };
  return (
    <Button onClick={handleLogout} cursor="pointer">
      logout
    </Button>
  );
}
