import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button, Container } from "@mui/material";

import { TeamsPlayersPropsProvider } from "./utils/TeamsPlayersProvider";
import GameContainer from "./components/GameContainer";
import HeaderAppBar from "./components/HeaderAppBar";

function App() {
  return (
    <div className="App">
      <HeaderAppBar />
      <Container>
        <TeamsPlayersPropsProvider>
          <GameContainer />
        </TeamsPlayersPropsProvider>
      </Container>
    </div>
  );
}

export default App;
