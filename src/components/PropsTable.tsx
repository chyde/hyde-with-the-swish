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

import { useTeamsPlayersProps } from "../utils/TeamsPlayersProvider";

export default function PropsTable() {
  const teams = useTeamsPlayersProps();
  // TODO: "Loading..." state needs to  be implemented
  const teamIds = teams ? Object.keys(teams) : [];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teams && teamIds && teamIds.length
            ? teamIds.map((teamId) => (
                <TableRow
                  key={teamId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {teamId}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {teams[teamId]?.teamNickname}
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
