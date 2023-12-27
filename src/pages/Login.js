import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/speech.svg';
import { validateLogin } from '../utils/validators';
import { Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import { loginRoute } from '../utils/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled('div')({
  backgroundImage: 'linear-gradient(to bottom right, #242025, #242025)',
  position: 'fixed',
  top: '0',
  left: '0',
  bottom: '0',
  right: '0',
  overflow: 'auto',
  color: '#efd3c8',
});

const Header = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'left',
  padding: '0px 15px',
});

const Title = styled('h1')({
  fontSize: '35px',
  padding: '0px 15px',
  fontFamily: 'Courier Prime',
});

const FormContainerOuter = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '80%',
});

const FormContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '30%',
});

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.5rem',
  width: '70%',
  padding: '0px',
});

const Label = styled('label')({
  fontSize: '16px',
  padding: '10px 0px 0px 0px',
});

const Input = styled('input')({
  background: '#312b31',
  color: '#efd3c8',
  width: '100%',
  border: 'none',
  borderRadius: '10px',
  height: '30px',
  padding: '10px',
  fontSize: '17px',
});

const ButtonDiv = styled('div')({
  width: '100%',
  padding: '20px 7px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const RedirectText = styled('span')({
  color: '#efd3c8',
  cursor: 'pointer',
  padding: '12px 0px',
  fontSize: '16px',
});

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validForm, setValidForm] = useState(false);

  let navigate = useNavigate();

  const toastOptions = {
    position: 'top-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  useEffect(() => {
    setValidForm(validateLogin({ email, password }));
    //if (localStorage.getItem('chat-app-user')) {
    //  navigate('/');
    //}
  }, [email, password, setValidForm /*navigate*/]);

  const getFormInvalidMessage = () => {
    return 'enter correct email and password! password should have more than 7 characters.';
  };

  const handleRegister = async () => {
    const { data } = await axios.post(loginRoute, {
      email,
      password,
    });
    if (data.status !== 200) {
      toast.error(data.msg, toastOptions);
    } else {
      localStorage.setItem('chat-app-user', JSON.stringify(data.userDetails));
      navigate('/');
    }
  };

  const handleRedirect = () => {
    navigate('/register');
  };

  return (
    <Container>
      <ToastContainer />
      <Header>
        <img src={Logo} alt="Logo" height="50 rem" />
        <Title> chatter.</Title>
      </Header>
      <FormContainerOuter>
        <FormContainer>
          <h1>welcome back!</h1>
          <Form onSubmit={(event) => handleRegister(event)}>
            <Label>email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
            />
            <Label>password</Label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
            />
            <Tooltip title={!validForm ? getFormInvalidMessage() : ''}>
              <ButtonDiv>
                <Button
                  variant="contained"
                  sx={{
                    textTransform: 'none',
                    background: '#efd3c8',
                    borderRadius: '10px',
                    width: '50%',
                    color: '#242025',
                    height: '40px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontFamily: 'Roboto Mono',
                    ':hover': {
                      bgcolor: '#efd3c8',
                      color: 'white',
                    },
                  }}
                  disabled={!validForm}
                  onClick={handleRegister}
                >
                  sign in now
                </Button>
                <RedirectText onClick={handleRedirect}>
                  don't have an account?
                </RedirectText>
              </ButtonDiv>
            </Tooltip>
          </Form>
        </FormContainer>
      </FormContainerOuter>
    </Container>
  );
}
