import React, { useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import music from '../assets/audio/Saucier.mp3';

const Box = styled.div`
  display: flex;
  cursor: pointer;
  position: fixed;
  right: calc(1rem + 2vw);
  top: 5rem;
  z-index: 10;

  & > *:nth-child(1) {
    animation-delay: 0.2s;
  }
  & > *:nth-child(2) {
    animation-delay: 0.3s;
  }
  & > *:nth-child(3) {
    animation-delay: 0.4s;
  }
  & > *:nth-child(4) {
    animation-delay: 0.5s;
  }
  & > *:nth-child(5) {
    animation-delay: 0.8s;
  }
`;

const play = keyframes`
  0% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(2);
  }
  100% {
    transform: scaleY(1);
  }
`;

const Line = styled.span`
  background: var(--main-decor-color);
//   border: 1px solid ${(props) => props.theme.body};

  animation: ${play} 1s ease infinite;
  animation-play-state: ${(props) => (props.click ? 'running' : 'paused')};
  height: 1rem;
  width: 2px;
  margin: 0 0.13rem;
`;

const SoundBar = () => {
  const volumeLevel = 0.1;
  const ref = useRef(null);
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);

    if (!click) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  };

  const setVolume = (volumeLevel) => {
    if (ref.current) {
      ref.current.volume = volumeLevel;
    }
  };
  React.useEffect(() => {
    setVolume(volumeLevel);
  }, [volumeLevel]);

  return (
    <Box onClick={handleClick}>
      🎵&nbsp;
      <Line click={click} />
      <Line click={click} />
      <Line click={click} />
      <Line click={click} />
      <Line click={click} />

      <audio src={music} ref={ref} loop />
    </Box>
  );
};

export default SoundBar;