type Rarity = "NORMAL" | "RARE" | "ULTRARARE" | "LEGENDARY";

export type Player = {
  firstName: string;
  lastName: string;
  playerId: number;
  teamId: number;
  // headshot: string;
  rarity: Rarity;
};

type Team = {
  teamId: number;
  abbreviation: string;
  teamName: string;
  simpleName: string;
  location: string;
};

type Conference = "Eastern" | "Western";
