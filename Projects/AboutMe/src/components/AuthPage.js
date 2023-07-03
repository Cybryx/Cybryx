import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components'
import { DarkTheme } from '../config/Themes';
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion';

import LogoComponent from '../subComponents/LogoComponent';
import SocialIcons from '../subComponents/SocialIcons';
import PowerButton from '../subComponents/PowerButton';
import BigTitle from '../subComponents/BigTitlte'

const Box = styled.div`
  background-color: ${props => props.theme.body};
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
`

const Main = styled.div`
  border-radius: 20px;
  color: ${props => props.theme.text};
  padding: 2rem;
  width: 80vw;
  height: 70vh;
  z-index: 3;
  line-height: 1.5;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: calc(0.2rem + 1vw);
  flex-direction: column;
  position: absolute;
  left: calc(3rem + 5vw);
  top: 10rem;

  @media screen and (max-width: 600px) {
    & {
      height: 35vh;
      width: 80vw;
      left: 1vh;
      top: 14rem;
    }
  }
`

const Contact = styled(NavLink)`
  color: ${props => props.theme.text};
  position: absolute;
  top: 2.2rem;
  right: calc(1rem + 2vw);
  text-decoration: none;
  z-index: 1;
`

const AuthPage = () => {
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [button, setButton] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const status = searchParams.get('redirect');
    const error = searchParams.get('error')
    const name = searchParams.get('uname');

    if (status === 'success' && name) {
      setStatus('Success!')
      setButton(<button className="confirm-button submit" onClick={() => window.location.href = "/x"}>Continue</button>);
      setMessage(`X service is now active, Welcome back ${name}.`);
    } else if (status === 'failure') {
      setStatus('Failure:(')
      setButton(<button className="confirm-button submit" onClick={() => window.location.href = "/login"}>Try Again!</button>);
      let customMessage = '';
      let tag = '';
      switch (error) {
        case '401':
          tag = "401_Unauthorized"
          customMessage = 'Incorrect password. Please try again.';
          break;
        case '404':
          tag = "404_Not_Found"
          customMessage = 'Username not found. Please try again.';
          break;
        default:
          tag = "400_Bad_Request"
          customMessage = `Service won't respond. Please try again.`;
          break;
      }
      setError(tag)
      setMessage(customMessage);
    } else {
      setStatus('Failure:(')
      setButton(<button className="confirm-button submit" onClick={() => window.location.href = "/"}>Back to Home</button>);
      setMessage(`503 Service Unavailable. Service Offline`)
    }
  }, []);

  return (
    <ThemeProvider theme={DarkTheme}>
      <Box>
        <LogoComponent theme='dark' />
        <SocialIcons theme='dark' />
        <PowerButton />
        <Contact to="/recover">
          <motion.h2
            initial={{
              y: 0,
              transition: { type: 'spring', duration: 1.5, delay: 1 }
            }}
            animate={{
              y: 0,
              transition: { type: 'spring', duration: 1.5, delay: 1 }
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Recovery
          </motion.h2>
        </Contact>
        <Main>
          <div className='confirm'>
            <h1>Authentication Alert</h1>
            <h3>{error}<hr />{message}<br />{button}</h3>
          </div>
        </Main>
        <BigTitle text={status} top="10%" left="5%" />
      </Box>
    </ThemeProvider>
  );
}

export default AuthPage;
