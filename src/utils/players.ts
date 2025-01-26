import { PackType } from "@prisma/client";
import players from "../../public/players.json";
import teams from "../../public/teams.json";
import { Conference, Player, Rarity, Team } from "../../types";

const easternTeams = [
  1610612739, // Cleveland Cavaliers
  1610612738, // Boston Celtics
  1610612752, // New York Knicks
  1610612749, // Milwaukee Bucks
  1610612754, // Indiana Pacers
  1610612765, // Detroit Pistons
  1610612753, // Orlando Magic
  1610612737, // Atlanta Hawks
  1610612748, // Miami Heat
  1610612741, // Chicago Bulls
  1610612755, // Philadelphia 76ers
  1610612751, // Brooklyn Nets
  1610612761, // Toronto Raptors
  1610612766, // Charlotte Hornets
  1610612764, // Washington Wizards
];

const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min); // Round up to the nearest integer
  max = Math.floor(max); // Round down to the nearest integer
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getPlayer = (
  index: number,
  rarity: Rarity = "NORMAL"
): Player | undefined => {
  const player = players[index];
  return { ...player, rarity };
};

const getTeam = (index: number): Team | undefined => {
  return teams[index];
};

const getRandomPlayer = (rarity: Rarity = "NORMAL") => {
  const random = getRandomInt(0, players.length);
  return getPlayer(random, rarity)!;
};

const getHeadshot = (playerId: number) => {
  const url = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playerId}.png`;
  return url;
};

const isConference = (conference: Conference, player: Player) => {
  if (conference === "Eastern" && easternTeams.includes(player.teamId)) {
    return true;
  }
  if (conference === "Western" && !easternTeams.includes(player.teamId)) {
    return true;
  }
  return false;
};

const getRarity = (player: Player, slot: number): Player => {
  // The fourth slot will have odds of 0.1 of being RARE and 0.01 of being ULTRARARE
  // The fifth slot will have odds of 0.3 of being RARE and 0.03 of being ULTRARARE
  // All other slots won't be RARE or ULTRARARE
  if (slot === 4) {
    const random = Math.random();
    if (random < 0.001) {
      return { ...player, rarity: "ULTRARARE" };
    } else if (random < 0.1) {
      return { ...player, rarity: "RARE" };
    }
  } else if (slot === 5) {
    const random = Math.random();
    if (random < 0.03) {
      return { ...player, rarity: "ULTRARARE" };
    } else if (random < 0.3) {
      return { ...player, rarity: "RARE" };
    }
  }
  return player;
};

const openPack = (pack: PackType) => {
  let conference;
  if (pack === "EAGEREASTERNCONFERENCE") conference = "Eastern";
  if (pack === "WILDWESTERNCONFERENCE") conference = "Western";

  const arr: Player[] = [];
  const seenPlayerIds: Set<number> = new Set();

  while (arr.length < 5) {
    let randomPlayer = getRandomPlayer();
    randomPlayer = getRarity(randomPlayer, arr.length);
    if (
      isConference(conference as Conference, randomPlayer) &&
      !seenPlayerIds.has(randomPlayer.playerId)
    ) {
      seenPlayerIds.add(randomPlayer.playerId);
      arr.push(randomPlayer);
    }
  }
  return arr;
};

export {
  getPlayer,
  getTeam,
  getRandomPlayer,
  openPack,
  getHeadshot,
  isConference,
};
