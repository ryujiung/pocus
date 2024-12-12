import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import HomePage from "./components/HomePage";
import Terms from "./components/Terms";
import GlobalStyle from "./GlobalStyle"; // GlobalStyle import

function App() {
  return (
    <>
      <GlobalStyle /> {/* GlobalStyle 추가 */}
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
