import React from 'react';
import { Toaster } from 'react-hot-toast';
import AppContent from './components/AppContent';
import AppHeader from './components/AppHeader';
import PageTitle from './components/PageTitle';
import styles from './styles/modules/app.module.scss';

function App() {
  const handleClearStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <div className="container">
        <PageTitle onClick={handleClearStorage}>
          <img width="28" height="28" src="./nazar.png" alt="" /> TODO LIST
        </PageTitle>
        <div className={styles.app__wrapper}>
          <AppHeader />
          <AppContent />
        </div>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: '1.4rem',
          },
        }}
      />
    </>
  );
}

export default App;
