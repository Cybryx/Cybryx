import { useEffect } from 'react';

const SecretService = () => {
  useEffect(() => {
    // Change the PWA theme to black on load
    const setTheme = () => {
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      metaThemeColor.setAttribute('content', 'black');
    };
    setTheme();
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      <iframe
        src="/x/index.html"
        title="Hidden Service"
        width="100%"
        style={{ border: 'none', height: '100%', overflow: 'hidden' }}
      ></iframe>
    </div>
  );
};

export default SecretService;
