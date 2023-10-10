import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button, Container } from "@mui/material";

import { TeamsPlayersPropsProvider } from "./utils/TeamsPlayersProvider";
import PropsTable from "./components/PropsTable";
import HeaderAppBar from "./components/HeaderAppBar";

function App() {
  return (
    <div className="App">
      <HeaderAppBar />
      <Container>
        <TeamsPlayersPropsProvider>
          <Button
            onClick={() => {
              console.log("Clicky");
            }}
          >
            Lemma at em!
          </Button>
          <PropsTable />
        </TeamsPlayersPropsProvider>
      </Container>
    </div>
  );
}

export default App;
