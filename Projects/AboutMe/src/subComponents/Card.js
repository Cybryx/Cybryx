import { motion } from 'framer-motion';
import React from 'react'
// import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Github } from '../data/AllSvgs';



const Box = styled(motion.li)`
width: 40rem;
height: 48vh;
background-color: ${props => props.theme.text};
border: 1px solid ${props => props.theme.body};
color:${props => props.theme.body};
padding: 1.5rem 2rem;
margin-right: 8rem;
border-radius: 0 50px 0 50px;
display: flex;
flex-direction: column;
justify-content: space-between;
transition: all 0.2s ease;
filter: drop-shadow(18px 16px 8px var(--main-decor-color));

&:hover{
    background-color: ${props => props.theme.body};
    border: 1px solid ${props => props.theme.text};
    color:${props => props.theme.text};
    filter: drop-shadow(8px 6px 8px var(--sec-decor-color));
}

@media screen and (max-width: 600px) {
    &{
        width: 16rem;
        filter: drop-shadow(8px 6px 8px var(--main-decor-color));
    }
}
`
const Title = styled.h2`
font-size: calc(1em + 0.5vw);
padding-bottom: 0.5em;

@media screen and (max-width: 600px) {
    &{
        font-size: calc(1.1em + 0.5vw);
        padding-top: 1em;
        padding-bottom: 0em;
    }
}

`
const Image = styled.div`
  background-image: ${(props) => `url(${props.img})`};
  width: 100%;
  height: 70%;
  background-size: contain;
  background-repeat: no-repeat;
  border: 1px solid transparent;
  background-position: center center;

  ${Box}:hover & {
    border: 1px solid ${(props) => props.theme.body};
    background-color: ${(props) => props.theme.body};
  }
`;

const Description = styled.h2`
font-size: calc(0.8em + 0.3vw);
font-family: 'Karla',sans-serif;
font-weight: 500;
padding-bottom: 0.5em;
`

const Tags = styled.div`
border-top: 2px solid ${props =>props.theme.body};
padding-top: 0.5rem;
display:flex;
flex-wrap:wrap;

${Box}:hover &{
    border-top: 2px solid ${props =>props.theme.text};
}
`
const Tag = styled.span`
margin-right:1rem;
font-size:calc(0.8em + 0.3vw);
`

const Footer = styled.footer`
display: flex;
justify-content: space-between;
`

const Link = styled.a`
background-color: ${props =>props.theme.body};
color: ${props =>props.theme.text};
text-decoration: none;
padding:0.5rem calc(2rem + 2vw);
border-radius: 0 0 0 50px;
font-size:calc(1em + 0.5vw);

${Box}:hover &{
    background-color: ${props =>props.theme.text};
    color: ${props =>props.theme.body};
}
`

const Git = styled.a`
color: inherit;
text-decoration: none;
${Box}:hover &{
    &>*{
        fill:${props =>props.theme.text};
    }
}

`

// Framer motion configuration
const Item = {
    hidden:{
        scale:0
    },
    show:{
        scale:1,
        transition: {
            type: 'spring',
            duration: 0.5
        }
    }
}

const Card = (props) => {

    const {id, name, imgSrc, description, tags, demo, github} = props.data;

    return (
        <Box key={id} variants={Item}>
            <Title>{name}</Title>
            <Image img={imgSrc}/>
            <Description>
                {description}
            </Description>
            <Tags>
            {
                    tags.map((t,id) => {
                        return <Tag key={id}>#{t}</Tag>
                    })
                }
            </Tags><br></br>
            <Footer>
                <Link href={demo} target="_blank">
                    Visit
                </Link>
                <Git  href={github}  target="_blank">
                    <Github width={30} height={30} />
                </Git>
            </Footer>
        </Box>
    )
}

export default Card
