import { useEffect, useState } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  Button,
  Typography,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { Team, Player, MarketPropType } from "../utils/MarketTypes";
import { useFilters } from "../utils/FiltersProvider";

const contains = (str: string, substr: string) => {
  return str.toLowerCase().includes(substr.toLowerCase());
};

const MIN_ODDS = 0.4;

function PlayerMarketRow(props: {
  playerName: string;
  prop: MarketPropType;
  showPlayerName?: boolean;
}) {
  const { prop, playerName, showPlayerName = true } = props;
  const { filters } = useFilters();
  const [isShowing, setIsShowing] = useState(true);
  const isSuspended = prop.marketSuspended === 1;
  let hasNoOptimalAlternate = true;
  let noMinOddsMet = true;

  if (prop.optimalAlternate) {
    hasNoOptimalAlternate = prop.optimalAlternate.line !== prop.line;
    noMinOddsMet =
      prop.optimalAlternate.overOdds < MIN_ODDS &&
      prop.optimalAlternate.underOdds < MIN_ODDS &&
      prop.optimalAlternate.pushOdds < MIN_ODDS;
  }

  const [marketSuspended, setMarketSuspended] = useState(
    isSuspended || hasNoOptimalAlternate || noMinOddsMet
  );

  useEffect(() => {
    if (
      filters.searchString &&
      !contains(prop.playerName, filters.searchString) &&
      !contains(prop.teamNickname, filters.searchString)
    ) {
      setIsShowing(false);
      return;
    }
    if (
      filters.statTypeId &&
      filters.statTypeId > -1 &&
      prop.statTypeId !== filters.statTypeId
    ) {
      setIsShowing(false);
      return;
    }
    if (
      filters.position &&
      filters.position !== "ANY" &&
      prop.position !== filters.position
    ) {
      setIsShowing(false);
      return;
    }

    if (
      filters.marketStatus !== undefined &&
      filters.marketStatus !== -1 &&
      filters.marketStatus !== (marketSuspended ? 1 : 0)
    ) {
      setIsShowing(false);
      return;
    }

    setIsShowing(true);
  }, [filters, marketSuspended, prop]);

  if (!isShowing) return null;

  const forceShowPlayerName =
    (filters.marketStatus !== undefined && filters.marketStatus > -1) ||
    (filters.statTypeId && filters.statTypeId > -1);

  const isTopRowForPlayer = showPlayerName || forceShowPlayerName;

  return (
    <TableRow
      sx={{
        borderTopStyle: isTopRowForPlayer ? "solid" : undefined,
        backgroundColor: marketSuspended ? "#eeeeee" : undefined,
      }}
    >
      <TableCell>{isTopRowForPlayer ? playerName : null}</TableCell>
      <TableCell>{isTopRowForPlayer ? prop.position : null}</TableCell>
      <TableCell>{prop.statType}</TableCell>

      <TableCell>{prop.lowAlternate?.line ?? "-"}</TableCell>
      <TableCell>
        <b>{prop.line}</b>
      </TableCell>
      <TableCell>{prop.highAlternate?.line ?? "-"}</TableCell>

      {marketSuspended ? (
        <TableCell>
          <Tooltip
            sx={{ cursor: "pointer" }}
            title={
              hasNoOptimalAlternate
                ? "No optimal line available"
                : noMinOddsMet
                ? "Minimum odds not met"
                : "Assigned as suspended"
            }
          >
            <Typography color={"error"} variant="body2">
              {" "}
              Suspended <InfoOutlinedIcon />
            </Typography>
          </Tooltip>
        </TableCell>
      ) : (
        <TableCell />
      )}
      <TableCell>
        <Button
          size="small"
          onClick={() => {
            setMarketSuspended(!marketSuspended);
          }}
          variant={"outlined"}
          color={marketSuspended ? "success" : "error"}
        >
          {marketSuspended ? "Release" : "Suspend"}
        </Button>
      </TableCell>
    </TableRow>
  );
}

function createPlayerRows(player: Player) {
  return player.props.map((prop, propIndex) => (
    <PlayerMarketRow
      key={`${player.playerName}-${propIndex}`}
      playerName={player.playerName}
      showPlayerName={propIndex === 0}
      prop={prop}
    />
  ));
}

export default function TeamPropsTable({ team }: { team: Team }) {
  return (
    <TableContainer component={Paper} sx={{ marginTop: 3 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {Object.keys(team.players).map((playerId) => {
            const player: Player = team.players[playerId];
            return createPlayerRows(player);
          })}
          <TableRow className={"onlyChildShow"}>
            <TableCell>
              <Typography sx={{ margin: 2, color: "gray" }}>
                No available lines.
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
