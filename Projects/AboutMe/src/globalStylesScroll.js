import { createGlobalStyle } from "styled-components";




const ProjectStyles = createGlobalStyle`

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
    overflow-x: hidden;
    font-family: 'Source Sans Pro',sans-serif;
}

/* iPhone X Viewport*/
.post {
    padding: 12px;
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
}

.app {
  padding: 20px;
  padding-top: 5rem;
  text-align: center;
}
  
.hero-image {
  max-width: calc(30rem + 2vw);
  height: auto;
}

.products {
  margin-top: 1px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 20px;
  
  // display: grid;
  // grid-template-columns: repeat(2, minmax(calc(10rem + 15vw), 1fr));
  // grid-gap: calc(1rem + 2vw);
  // @media screen and (max-width: 600px) {
  //   &{
  //     grid-template-columns: repeat(1, minmax(calc(10rem + 15vw), 1fr));
  //   }
  // }
}

.input {
  padding: 8px;
  color: black;
  background: transparent;
  border: none;
  border-bottom: 2px solid var(--main-decor-color);
  user-select: none;
  text-align: center;
  font-size: 1.5rem;
}

.w3-button {
  margin-bottom: 10px;
  border: none;
  display: inline-block;
  padding: 8px 16px;
  vertical-align: middle;
  overflow: hidden;
  text-decoration: none;
  color: black;
  background-color: PaleGreen ;
  text-align: center;
  cursor: pointer;
  white-space: nowrap;
  border-radius: 8px;
  user-select: none;
}

.w3-button:hover {
  color: white !important;
  background-color: var(--main-decor-color) !important;
}

/* Confirm */
.confirm{
  padding-bottom: auto;
  height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.5em;
}

.confirm h3 {
  padding: 10px;
  text-align: center;
  font-family: var(--main-font-family);
  user-select: none;
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

.confirm-button {
  margin-top: 15px;
  border: none;
  display: inline-block;
  padding: 8px 16px;
  vertical-align: middle;
  overflow: hidden;
  text-decoration: none;
  color: black;
  background-color: #fff ;
  text-align: center;
  cursor: pointer;
  white-space: nowrap;
  border-radius: 8px;
  user-select: none;
}

.confirm-button:hover {
  color: white !important;
  background-color: var(--main-decor-color) !important;
}

@media screen and (max-width: 600px) {
  &{
    .hero{
      font-size: 1.05rem;
    }
    .hero-image {
      max-width: 100%;
      height: auto;
    }
    .product-image {
      width: 115%;
      height: auto;
      justify-self: center;
      z-index: 999999;
      filter: drop-shadow(0px 0px 10px rgba(255,0,242, 0.2));
    }
  }
`

export default ProjectStyles;