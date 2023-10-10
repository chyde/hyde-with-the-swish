import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { getProps } from "../api/fake-api";

export type MarketPropType = {
  playerName: string;
  playerId: number;
  teamId: number;
  teamNickname: string;
  teamAbbr: string;
  statType: string;
  statTypeId: number;
  position: string;
  marketSuspended: 0 | 1 | number;
  line: number;
};

export type Player = {
  playerName: string;
  playerId: number;
  position: string;
  props: MarketPropType[];
};

export type Team = {
  teamId: number;
  teamNickname: string;
  teamAbbr: string;
  players: { [key: string]: Player };
};

export type TeamsPlayerPropType = {
  [key: string]: Team;
};

const TeamsPlayersPropsContext = createContext<TeamsPlayerPropType | null>({});
// TODO: implement loading feature to show loading state

const marketPropsToTeamPlayerProps = (
  propMarkets: MarketPropType[]
): TeamsPlayerPropType => {
  const teams: TeamsPlayerPropType = {};

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
      teams[market.teamId].players[market.playerId] = {
        playerName: market.playerName,
        playerId: market.playerId,
        position: market.position,
        props: [],
      };
    }

    teams[market.teamId].players[market.playerId].props.push(market);
  });

  return teams;
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
  // TODO: implelment a useReducer() for fake data management

  return (
    <TeamsPlayersPropsContext.Provider value={teamsPlayersProps}>
      {children}
    </TeamsPlayersPropsContext.Provider>
  );
}

export const useTeamsPlayersProps = () => {
  return useContext(TeamsPlayersPropsContext);
};
