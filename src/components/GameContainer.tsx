import { Grid, Paper } from "@mui/material";
import React from "react";
import { Team, useTeamsPlayersProps } from "../utils/TeamsPlayersProvider";
import TeamPropsTable from "./TeamPropsTable";

export default function GameContainer() {
  const teams = useTeamsPlayersProps();
  // TODO: "Loading..." state needs to  be implemented
  const teamIds = teams ? Object.keys(teams) : [];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {teamIds.map((teamId) => {
          const team = teams ? teams[teamId] : null;
          if (team !== null)
            return (
              teams && (
                <Paper>
                  <TeamPropsTable team={team} />
                </Paper>
              )
            );
        })}
      </Grid>
    </Grid>
  );
}
