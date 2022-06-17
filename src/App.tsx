import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layouts";
import { Animals } from "./components/pages/Animals";
import { MainWrapper } from "./components/StyledComponents/StyledWrappers";
import { Animal } from "./components/pages/Animal";
import { StyledHeader } from "./components/StyledComponents/StyledHeader";

function App() {
  return (
    <>
      <StyledHeader>
        <h3 className="headerTitle">ZOOBASTIAN</h3>
      </StyledHeader>
      <MainWrapper>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Animals />}></Route>
              <Route path="/animal/:id" element={<Animal />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </MainWrapper>
    </>
  );
}

export default App;
