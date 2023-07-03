import React from 'react'
import { motion } from "framer-motion"
import styled from 'styled-components'

const SkillBG = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background: repeating-radial-gradient(rgba(0,0,0,0.4) 2px, #f5f5f5 5px, #f5f5f5 150px);
  filter: drop-shadow(0px 30px 50px var(--sec-decor-color));

  @media screen and (max-width: 600px) {
    & {
      background: repeating-radial-gradient(var(--main-decor-color) 3px, #f5f5f5 5px, #f5f5f5 30px);
      font-size: .5rem;
    }
  }
`

const Skills = ({ name, x, y }) => {
  return (
    <motion.div className="skills"
      whileHover={{ scale: 1.15 }}
      initial={{ x: 0, y: 0 }}
      animate={{ x: x, y: y }}
      transition={{ duration: 0.5 }}
    >
      {name}
    </motion.div>
  )
}

const MySkillsComponent = () => {
  return (
    <SkillBG>
      <Skills name="Technical" x="-5vw" y="-3vw" />
      <Skills name="NIST" x="15vw" y="10vw" />
      <Skills name="SANS" x="-5vw" y="-15vw" />
      <Skills name="OWASP" x="-10vw" y="-20vw" />
      <Skills name="OOPS" x="-35vw" y="-5vw" />
      <Skills name="Data" x="-15vw" y="-30vw" />
      <Skills name="DBMS" x="20vw" y="-5vw" />
      <Skills name="Git" x="-15vw" y="20vw" />
      <Skills name="Adobe Suite" x="10vw" y="0vw" />
      <Skills name="O365" x="-10vw" y="5vw" />
      <Skills name="wServer" x="30vw" y="0vw" />
      <Skills name="Nmap" x="-15vw" y="-10vw" />
      <Skills name="ReactJS" x="0vw" y="15vw" />
      <Skills name="C++" x="-20vw" y="10vw" />
      <Skills name="Docker" x="5vw" y="-25vw" />
    </SkillBG>


  )
}

export default MySkillsComponent
