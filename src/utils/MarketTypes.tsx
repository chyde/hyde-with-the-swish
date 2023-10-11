export type MarketAlternateType = {
  playerName: string;
  playerId: number;
  statType: string;
  statTypeId: number;
  line: number;
  underOdds: number;
  overOdds: number;
  pushOdds: number;
};

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
  optimalAlternate?: MarketAlternateType;
  highAlternate?: MarketAlternateType;
  lowAlternate?: MarketAlternateType;
};

export type Player = {
  playerName: string;
  playerId: number;
  position: string;
  props: MarketPropType[];
  alternates: { [alternateTypeId: string]: MarketAlternateType[] };
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

export type PlayerMarketAlternatesType = {
  [key: string]: MarketAlternateType[];
};
