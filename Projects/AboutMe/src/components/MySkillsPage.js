import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { DarkTheme } from '../config/Themes';
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion';

import LogoComponent from '../subComponents/LogoComponent';
import SocialIcons from '../subComponents/SocialIcons';
import PowerButton from '../subComponents/PowerButton';
import BigTitle from '../subComponents/BigTitlte'
import MySkillsComponent from './MySkillsComponent';


const Box = styled.div`
background-color: ${props => props.theme.body};
width: 100vw;
height:100vh;
position: relative;
overflow: hidden;

`
const Main = styled.div`
//   border: 2px solid ${(props) => props.theme.text};
  border-radius: 20px;
  color: ${(props) => props.theme.text};
  padding: 2rem;
  width: 80vw;
  height: 70vh;
  z-index: 3;
  line-height: 1.5;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: calc(0.2rem + 1vw);
  backdrop-filter: blur(4px);
  flex-direction: column;
  position: absolute;
  left: calc(3rem + 5vw);
  top: 10rem;
  @media screen and (max-width: 600px) {
    &{
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
z-index:1;
`

const AboutPage = () => {
    return (
        <ThemeProvider theme={DarkTheme}>
            <Box>

                <LogoComponent theme='dark' />
                <SocialIcons theme='dark' />
                <PowerButton />
                <Contact to="/contact">
                    <motion.h2
                        initial={{
                            y: 0, // -200 for animation
                            transition: { type: 'spring', duration: 1.5, delay: 1 }
                        }}
                        animate={{
                            y: 0,
                            transition: { type: 'spring', duration: 1.5, delay: 1 }
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}

                    >
                        Talk to me..
                    </motion.h2>
                </Contact>
                <Main>
                <MySkillsComponent />

                </Main>

                <BigTitle text="SKILLS" top="10%" left="5%" />


            </Box>

        </ThemeProvider>

    )
}

export default AboutPage
