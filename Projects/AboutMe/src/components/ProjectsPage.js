import React, { useEffect, useRef } from "react";
import styled, { ThemeProvider } from "styled-components";
import { DarkTheme } from "../config/Themes";
import { motion } from "framer-motion";

import LogoComponent from "../subComponents/LogoComponent";
import SocialIcons from "../subComponents/SocialIcons";
import PowerButton from "../subComponents/PowerButton";

import { Projects } from "../data/ProjectsData";
import Card from "../subComponents/Card";
import { Nazar } from "../data/AllSvgs";
import BigTitlte from "../subComponents/BigTitlte";

const Box = styled.div`
  background-color: ${(props) => props.theme.body};
  height: 400vh;
  position: relative;
  display: flex;
  align-items: center;
`;
const Contact = styled.a`
color: ${props => props.theme.text};
position: fixed;
top: 2.2rem;
right: calc(1rem + 2vw);
text-decoration: none;
z-index:1;
`;
const Main = styled(motion.ul)`
  position: fixed;
  top: 11rem;
  left: calc(0rem + 9vw);
  height: 40vh;
  display: flex;
  color: white;
`;
const Rotate = styled.span`
  display: block;
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  width: 80px;
  height: 80px;
  z-index: 1;
`;

// Framer-motion Configuration
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
      duration: 0.5,
    },
  },
};

const ProjectPage = () => {
  const ref = useRef(null);
  const nazar = useRef(null);

  useEffect(() => {
    let element = ref.current;

    const rotate = () => {
      element.style.transform = `translateX(${-window.pageYOffset}px)`;

      return (nazar.current.style.transform =
        "rotate(" + window.pageYOffset + "deg)");
    };

    window.addEventListener("scroll", rotate);
    return () => {
      window.removeEventListener("scroll", rotate);
    };
  }, []);

  return (
    <ThemeProvider theme={DarkTheme}>
      <Box>
        <LogoComponent theme="dark" />
        <SocialIcons theme="dark" />
        <PowerButton />
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

        <Main ref={ref} variants={container} initial="hidden" animate="show">
          {Projects.map((d) => (
            <Card key={d.id} data={d} style={{}} />
          ))}
        </Main>
        <Rotate ref={nazar}>
          <Nazar width={80} height={80} fill={DarkTheme.text} />
        </Rotate>

        <BigTitlte text="WORK" top="10%" right="20%" />
      </Box>
    </ThemeProvider>
  );
};

export default ProjectPage;
