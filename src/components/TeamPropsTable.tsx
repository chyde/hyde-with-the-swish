import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  useContext,
} from "react";

import {
  useTeamsPlayersProps,
  Team,
  Player,
} from "../utils/TeamsPlayersProvider";

export default function TeamPropsTable({ team }: { team: Team }) {
  return (
    <TableContainer component={Paper} sx={{ marginTop: 3 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{team.teamNickname}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(team.players).map((playerId) => {
            const player: Player = team.players[playerId];
            return (
              <TableRow>
                <TableCell>{player.playerName}</TableCell>
                <TableCell>{player.props[0].statType}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
