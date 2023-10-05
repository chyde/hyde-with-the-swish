import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button, Container } from "@mui/material";

import MarketDataProvider from "./utils/Market";
import PropsTable from "./components/PropsTable";

function App() {
  return (
    <div className="App">
      <Container>
        <MarketDataProvider>
          <Button
            onClick={() => {
              console.log("Clicky");
            }}
          >
            Lemma at em!
          </Button>
          <PropsTable />
        </MarketDataProvider>
      </Container>
    </div>
  );
}

export default App;
