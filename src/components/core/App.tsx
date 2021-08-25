import React from "react";
import Header from "./Header";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./Main";
import Footer from "./Footer";
import { AuthProvider } from "../auth/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Main />
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
