import { openPack } from "@/utils/players";
import { Player } from "../../types";
import prisma from "./prisma";
import { PackType } from "@prisma/client";

const getUser = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
    include: { cards: true, packs: true },
  });
};

const getPack = async (id: string) => {
  return await prisma.pack.findUnique({
    where: { id },
    include: { players: true },
  });
};

const createPlayerCard = async (
  player: Player,
  userId: number,
  packId: string
) => {
  await prisma.card.create({
    data: {
      ...player,
      userId,
      packId,
    },
  });
};

const setPackAsOpened = async (id: string) => {
  await prisma.pack.update({ where: { id }, data: { opened: true } });
};

const createPack = async (packType: PackType, userId: number) => {
  const pack = await prisma.pack.create({
    data: { userId, opened: false, type: packType },
  });

  const players = openPack(packType);
  players.forEach(async (card) => {
    await createPlayerCard(card, userId, pack.id);
  });
};

export { getUser, getPack, createPack, setPackAsOpened };
