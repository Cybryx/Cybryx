import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RainbowBreathingAnimation = () => {
  const location = useLocation();

  useEffect(() => {
    const metaTag = document.querySelector('meta[name="theme-color"]');
    let hue = 0;

    const animateColor = () => {
      hue = (hue + 1) % 360;
      const color = `hsl(${hue}, 100%, 50%)`;
      metaTag.setAttribute('content', color);
    };

    const animationInterval = setInterval(animateColor, 100); // Adjust the interval speed as desired

    return () => {
      clearInterval(animationInterval);
    };
  }, [location.pathname]);

  return null;
};

export default RainbowBreathingAnimation;
