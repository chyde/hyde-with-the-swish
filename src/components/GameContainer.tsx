import { Grid, Paper } from "@mui/material";
import // createContext,
// useContext,
// useEffect,
// useState,
// ReactNode,
"react";

export default function GameContainer() {
  // const teams = useTeamsPlayersProps();
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={8}>
        <Paper>xs=6 md=8</Paper>
      </Grid>
    </Grid>
  );
}
