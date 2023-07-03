import React from 'react'
import styled from 'styled-components'
import { DarkTheme } from '../config/Themes'




const Logo = styled.h1`
display: inline-block;
color: ${props => props.color === 'dark' ? DarkTheme.text : DarkTheme.body};
font-family: Comforter,'Pacifico',cursive;

position: fixed;
left: 1.5rem;
top: 2rem;
z-index:3;
font-size: 2.3rem;
`

const LogoComponent = (props) => {
    return (
        <Logo color={props.theme}>
          CybryX
        </Logo>
    )
}

export default LogoComponent
