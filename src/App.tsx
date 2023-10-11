import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button, Container } from "@mui/material";

import { TeamsPlayersPropsProvider } from "./utils/TeamsPlayersProvider";
import GameContainer from "./components/GameContainer";
import HeaderAppBar from "./components/HeaderAppBar";
import FiltersProvider from "./utils/FiltersProvider";

function App() {
  return (
    <div className="App">
      <TeamsPlayersPropsProvider>
        <FiltersProvider>
          <HeaderAppBar />
          <Container>
            <GameContainer />
          </Container>
        </FiltersProvider>
      </TeamsPlayersPropsProvider>
    </div>
  );
}

export default App;
