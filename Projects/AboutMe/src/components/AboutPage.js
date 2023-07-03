import React from 'react'
import styled, { keyframes, ThemeProvider } from 'styled-components'
import { DarkTheme } from '../config/Themes';
import { motion } from 'framer-motion'

import LogoComponent from '../subComponents/LogoComponent';
import SocialIcons from '../subComponents/SocialIcons';
import PowerButton from '../subComponents/PowerButton';
import ParticleComponent from '../subComponents/ParticleComponent';
import BigTitle from '../subComponents/BigTitlte'
import amongus from '../assets/Images/zebra.png'
import AgeComponent from '../subComponents/Age';

const Box = styled.div`
    background-color: ${props => props.theme.body};
    width: 100vw;
    height:100vh;
    position: relative;
    overflow: hidden;
`
const float = keyframes`
    0% { transform: translateY(-10px) }
    50% { transform: translateY(15px) translateX(15px) }
    100% { transform: translateY(-10px) }
`
const Spaceman = styled.div`
    position: absolute;
    top: 10%;
    right: 5%;
    width: 30vw;
    animation: ${float} 4s ease infinite;
    img{
        width: 100%;
        height: auto;
    }
`
const Main = styled.div`
    border: 2px solid ${(props) => props.theme.text};
    border-radius: 20px;
    color: ${(props) => props.theme.text};
    padding: 2rem;
    width: 50vw;
    height: 60vh;
    z-index: 3;
    line-height: 1.5;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: calc(0.6rem + 1vw);
    backdrop-filter: blur(2px);
  
    position: absolute;
    left: calc(5rem + 5vw);
    top: 10rem;
    font-family: 'Ubuntu Mono', monospace;
    font-style: italic;
`
const Contact = styled.a`
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
                <ParticleComponent theme='dark' />
                <Contact href="/contact">
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

                <Spaceman>
                    <img src={amongus} alt="amongus" />
                </Spaceman>
                <Main>
                    <AgeComponent />
                </Main>

                <BigTitle text="ABOUT" top="10%" left="5%" />


            </Box>

        </ThemeProvider>

    )
}

export default AboutPage
