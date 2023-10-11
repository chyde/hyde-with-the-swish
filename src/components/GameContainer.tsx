import { Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useTeamsPlayersProps } from "../utils/TeamsPlayersProvider";
import TeamPropsTable from "./TeamPropsTable";

export default function GameContainer() {
  const teams = useTeamsPlayersProps();
  // TODO: "Loading..." state needs to  be implemented
  const teamIds = teams ? Object.keys(teams) : [];

  return (
    <Grid container xs={12} spacing={2} sx={{ marginTop: 2 }}>
      {teamIds.map((teamId) => {
        const team = teams ? teams[teamId] : null;
        if (team !== null)
          return (
            teams && (
              <Grid item xs={12}>
                <Typography textAlign={"left"} variant="h5">
                  {team.teamNickname}
                </Typography>
                <TeamPropsTable team={team} />
              </Grid>
            )
          );
      })}
    </Grid>
  );
}
