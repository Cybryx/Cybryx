import { createGlobalStyle } from "styled-components";




const GlobalStyle = createGlobalStyle`

:root{
	--main-decor-color:#468af0;
    --sec-decor-color:#ff00f2;
    user-select:none;
}

*,*::before,*::after,h1,h2,h3,h4,h5,h6{
    margin: 0;
    padding: 0;
}
h1,h2,h3,h4,h5,h6{
    display: inline-block;
}


body{
    margin: 0;
    padding: 0;
    overflow: hidden;
    font-family: 'Source Sans Pro',sans-serif;
}

/* iPhone X Viewport*/
.post {
    padding: 12px;
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
}

.hero{
    padding-bottom: 15px;
    letter-spacing: normal;
	font-style: normal;
	font-size: 5rem;
	color: #fff;
	text-shadow: 0px 0px 20px var(--sec-decor-color);
    user-select: none
}

.skills {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    transform: rotateX(deg);
    top: 50%;
    left: 50%;
    border-radius: 9999px;
    color: #fff;
    padding: 5px;
    background-color: #161c2d;
}

hr {
    background: var(--main-decor-color);
    margin: 2px;
    height: 3px;
    width: 100px;
    border-radius:5px;
    border: hidden;
    margin-inline-start: auto;
    margin-inline-end: auto;
}

.w3-input{ 
    padding:8px;
    padding-left:8px;
    display:block;
    color: white;
    background: transparent;
    border:none;
    border-bottom:1px solid var(--main-decor-color);
    width:93%;
    user-select: none
}
.w3-button{
    margin-bottom: 10px;
    border:none;
    display:inline-block;
    padding:8px 16px; 
    vertical-align:middle;
    overflow:hidden;
    text-decoration:none;
    color:black;
    background-color:white;
    text-align:center;
    cursor:pointer;
    white-space:nowrap;
    border-radius: 8px;
    user-select: none
}
.w3-button:hover{
    color:white!important;
    background-color: var(--main-decor-color)!important;
}

.w3-padding-large{
    padding:12px 24px!important
}

@media screen and (max-width: 600px) {
    .hero{
        font-size: 3.5rem;
    }
    .w3-button{
        width: 100%;
    }
}
`

export default GlobalStyle;