import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { getProps, getAlternates } from "../api/fake-api";
import {
  MarketPropType,
  MarketAlternateType,
  TeamsPlayerPropType,
  PlayerMarketAlternatesType,
} from "./MarketTypes";

const TeamsPlayersPropsContext = createContext<{
  teamsPlayersProps: TeamsPlayerPropType | null;
  statTypes: [string, string][];
  positions: string[];
}>({
  teamsPlayersProps: null,
  statTypes: [],
  positions: [],
});
// TODO: implement loading feature to show loading state

const marketPropsToTeamPlayerProps = (
  propMarkets: MarketPropType[]
): [TeamsPlayerPropType, [string, string][], string[]] => {
  const teams: TeamsPlayerPropType = {};
  const positions: { [name: string]: true } = {};
  const statTypes: { [id: number]: string } = {};

  const alternates = mapPlayerAlternates();

  propMarkets.forEach((market) => {
    if (!teams[market.teamId]) {
      teams[market.teamId] = {
        teamId: market.teamId,
        teamNickname: market.teamNickname,
        teamAbbr: market.teamAbbr,
        players: {},
      };
    }

    if (!teams[market.teamId]?.players[market.playerId]) {
      const playerAlts: { [key: string]: MarketAlternateType[] } = {};

      alternates[market.playerId]?.forEach((alt) => {
        if (!playerAlts[alt.statTypeId]) {
          playerAlts[alt.statTypeId] = [];
        }
        playerAlts[alt.statTypeId].push(alt);
      });

      teams[market.teamId].players[market.playerId] = {
        playerName: market.playerName,
        playerId: market.playerId,
        position: market.position,
        props: [],
        alternates: playerAlts,
      };
    }
    let altOptimal: MarketAlternateType | undefined = undefined;
    let altLow: MarketAlternateType | undefined = undefined;
    let altHigh: MarketAlternateType | undefined = undefined;
    teams[market.teamId].players[market.playerId].alternates[
      market.statTypeId
    ]?.forEach((alt) => {
      if (alt.line === market.line) {
        altOptimal = alt;
      }
      if (altLow === undefined || alt.line < altLow.line) {
        altLow = alt;
      }
      if (altHigh === undefined || alt.line > altHigh.line) {
        altHigh = alt;
      }
    });

    teams[market.teamId].players[market.playerId].props.push({
      ...market,
      optimalAlternate: altOptimal,
      highAlternate: altHigh,
      lowAlternate: altLow,
    });

    // account for all market stat types
    if (statTypes[market.statTypeId] === undefined) {
      statTypes[market.statTypeId] = market.statType;
    }
    if (positions[market.position] === undefined) {
      positions[market.position] = true;
    }
  });

  const statTypesList = Object.keys(statTypes).map(
    (statTypeId): [string, string] => {
      return [statTypeId, statTypes[parseInt(statTypeId)]];
    }
  );
  const positionsList = Object.keys(positions);

  return [teams, statTypesList, positionsList];
};

const mapPlayerAlternates = (): PlayerMarketAlternatesType => {
  const alternates: MarketAlternateType[] = getAlternates();
  const playerAlternates: PlayerMarketAlternatesType = {};

  alternates.forEach((alternate) => {
    if (!playerAlternates[alternate.playerId]) {
      playerAlternates[alternate.playerId] = [];
    }

    playerAlternates[alternate.playerId].push(alternate);
  });

  return playerAlternates;
};

export function TeamsPlayersPropsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [teamsPlayersProps, setTeamsPlayersProps] =
    useState<TeamsPlayerPropType | null>(null);
  const [statTypes, setStatTypes] = useState<[string, string][]>([]);
  const [positions, setPositions] = useState<string[]>([]);

  useEffect(() => {
    const propsData = getProps(); // Normally, this would be some API call
    const [teamsPlayersProps, statTypesList, positionsList] =
      marketPropsToTeamPlayerProps(propsData);

    setStatTypes(statTypesList);
    setPositions(positionsList);
    setTeamsPlayersProps(teamsPlayersProps);
  }, []);

  return (
    <TeamsPlayersPropsContext.Provider
      value={{ teamsPlayersProps, statTypes, positions }}
    >
      {children}
    </TeamsPlayersPropsContext.Provider>
  );
}

export const useTeamsPlayersProps = () => {
  return useContext(TeamsPlayersPropsContext);
};
