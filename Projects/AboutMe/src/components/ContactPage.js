import React from 'react'
import styled, { keyframes, ThemeProvider } from 'styled-components'
import { DarkTheme } from '../config/Themes';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';

import LogoComponent from '../subComponents/LogoComponent';
import SocialIcons from '../subComponents/SocialIcons';
import PowerButton from '../subComponents/PowerButton';
import BigTitle from '../subComponents/BigTitlte'
import amongus from '../assets/Images/zebra.png'

const rawsubject = "mailto:x@simer.ml?subject=CybryX Private Affair | Ref # id"
const subject = rawsubject.replace("id", uuidv4().split("-")[0])

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
  width: 60vw;
  height: 70vh;
  z-index: 3;
  line-height: 1.5;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: calc(0.6rem + 1vw);
  backdrop-filter: blur(4px);
  flex-direction: column;

  position: absolute;
  left: calc(3rem + 5vw);
  top: 10rem;
  @media screen and (max-width: 600px) {
    &{
        height: 60vh;

    }
   }
  
`
const Description = styled.div`
color: ${props => props.theme.text};
font-size: 1.24vw;
padding: 0.1rem 0;

strong{
    margin-bottom: 1rem;
    text-transform: uppercase;
}
ul,p{
    margin-left: -0.125rem;
}
a {
    color: var(--main-decor-color);
    text-decoration: none;
}
@media screen and (max-width: 600px) {
    &{
        font-size: calc(0.6em + 1vw);

    }
}
`

const Resume = styled.a`
    color: ${props => props.theme.text};
    position: absolute;
    top: 2.2rem;
    right: calc(1rem + 2vw);
    text-decoration: none;
    z-index:1;
`

const ContactPage = () => {
    return (
        <ThemeProvider theme={DarkTheme}>
            <Box>

                <LogoComponent theme='dark' />
                <SocialIcons theme='dark' />
                <PowerButton />
                <Resume href="https://cdn.simer.ml/content/Simer/Resume.docx">
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
                        My Resume
                    </motion.h2>
                </Resume>

                <Spaceman>
                    <img src={amongus} alt="amongus" />
                </Spaceman>
                <Main>
                    <Description>
                        <h3 className="hero">Contact
                            <hr></hr>
                        </h3>

                    </Description>
                    <Description>
                        <p>Shared inbox, <a href={subject}>x@cybryx.live</a> for private affairs</p>
                    </Description>
                    <Description>

                        <form method="post" action="/contact">
                            <input className="w3-input w3-padding-16" type="text" id='name' placeholder="Name" required name="name" />
                            <input className="w3-input w3-padding-16" type="email" id='email' placeholder="Email" required name="email" />
                            <input className="w3-input w3-padding-16" type="text" id='subject' placeholder="Subject" required name="subject" />
                            <select className="w3-input" required name="category" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                                <option value="GENERAL">GENERAL INQUIRY - Say Hi</option>
                                <option value="AAA">ACCOUNT MANAGEMENT & DATA REQUESTS</option>
                                <option value="FINANCE">BILLINGS, PAYMENTS, REFUNDS</option>
                                <option value="QA">BUG / ISSUE</option>
                                <option value="LEGAL">LEGAL - COPYRIGHT INFRINGEMENT & REMOVALS</option>
                                <option value="OTHERS">OTHERS</option>
                            </select>
                            <textarea className="w3-input w3-padding-16" type="text" id='message' placeholder="Message" cols="47" rows="7" required name="message" />
                            <br></br>
                            <input className="w3-button w3-light-grey w3-padding-large submit" size="60" type="submit" value="Send Message!" />
                        </form>
                    </Description>
                </Main>

                <BigTitle text="MAIL" top="10%" left="5%" />


            </Box>

        </ThemeProvider>

    )
}

export default ContactPage
