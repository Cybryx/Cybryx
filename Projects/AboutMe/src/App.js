import { Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./config/Themes";
import { AnimatePresence } from "framer-motion";

// Components
import Main from "./components/Main";
// import Secret from "./components/SecretService";
import AuthPage from "./components/AuthPage";
import AboutPage from "./components/AboutPage";
import MerchPage from "./components/MerchPage";
import ConfirmPage from "./components/ConfirmPage";
import ContactPage from "./components/ContactPage";
import OfflinePage from "./components/OfflinePage";
import ProjectsPage from "./components/ProjectsPage";
import MySkillsPage from "./components/MySkillsPage";
import SoundBar from "./subComponents/SoundBar";
import GlobalStyle from "./globalStyles";
import GlobalStyleScroll from "./globalStylesScroll";
// eslint-disable-next-line
import RainbowBreathingAnimation from './subComponents/Rainbow';


function App() {
  const location = useLocation();

  const isXPage = location.pathname === "/x" ||
    // location.pathname === "/confirm" ||
    location.pathname === "/hidden" ||
    location.pathname === "/dev2";
  const excludeGlobalRoutes = [
    "/merch",
    "/projects",
    "/confirm",
    "/auth",
    "/offline"
  ];

  const shouldExcludeGlobalRoutes = excludeGlobalRoutes.includes(location.pathname);


  return (
    <>
      <ThemeProvider theme={lightTheme}>
        {shouldExcludeGlobalRoutes ? <GlobalStyleScroll /> : <GlobalStyle />}
        {!isXPage && <SoundBar />}
        {/* <RainbowBreathingAnimation /> */}
        <AnimatePresence>
          <Routes location={location}>
            <Route path="/" element={<Main />} />
            {/* <Route path="/x" element={<Secret />} /> */}
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/confirm" element={<ConfirmPage />} />
            <Route path="/offline" element={<OfflinePage />} />
            <Route path="/merch" element={<MerchPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/skills" element={<MySkillsPage />} />
            {/* <Route path="*" element={<Main />} /> */}
          </Routes>
        </AnimatePresence>
      </ThemeProvider>
    </>
  );
}

export default App;