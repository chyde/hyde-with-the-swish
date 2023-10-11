import { Grid, Typography } from "@mui/material";
import { useTeamsPlayersProps } from "../utils/TeamsPlayersProvider";
import TeamPropsTable from "./TeamPropsTable";

export default function GameContainer() {
  const { teamsPlayersProps: teams } = useTeamsPlayersProps();

  // TODO: "Loading..." state needs to  be implemented
  const teamIds = teams ? Object.keys(teams) : [];

  return (
    <Grid container spacing={2} sx={{ marginTop: 4 }}>
      {teamIds.map((teamId) => {
        const team = teams ? teams[teamId] : null;

        if (team === null) return null;
        return (
          teams && (
            <Grid item xs={12} key={team.teamNickname}>
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
