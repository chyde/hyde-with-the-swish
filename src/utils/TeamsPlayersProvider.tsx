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

const TeamsPlayersPropsContext = createContext<TeamsPlayerPropType | null>({});
// TODO: implement loading feature to show loading state

const marketPropsToTeamPlayerProps = (
  propMarkets: MarketPropType[]
): TeamsPlayerPropType => {
  const teams: TeamsPlayerPropType = {};

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
  });

  return teams;
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

  useEffect(() => {
    const propsData = getProps(); // Normally, this would be some API call
    setTeamsPlayersProps(marketPropsToTeamPlayerProps(propsData));
  }, []);

  return (
    <TeamsPlayersPropsContext.Provider value={teamsPlayersProps}>
      {children}
    </TeamsPlayersPropsContext.Provider>
  );
}

export const useTeamsPlayersProps = () => {
  return useContext(TeamsPlayersPropsContext);
};
