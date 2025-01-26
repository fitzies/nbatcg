import { Star } from "lucide-react";
import { Player } from "../../types";
import { Card } from "./ui/card";
import { getHeadshot } from "@/utils/players";
import { motion } from "framer-motion";

const RarityStar = ({ count }: { count: number }) => {
  if (count === 1) return <Star className="scale-75" />;
  if (count === 2)
    return (
      <>
        <Star className="scale-75" />
        <Star className="scale-75" />
      </>
    );
};

function PlayerCard({
  player,
  justOpened = false,
}: {
  player: Player;
  justOpened?: boolean;
}) {
  if (justOpened) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="!shadow-lg w-[200px] h-[300px] flex flex-col items-center py-4 hover:-translate-y-4 duration-300">
          <p className="w-5/6 text-left flex gap-2 items-center">
            {`${player.firstName} ${player.lastName}`}
            <span className="text-zinc-400 text-sm">
              {player.rarity === "NORMAL" ? null : player.rarity === "RARE" ? (
                <RarityStar count={1} />
              ) : player.rarity === "ULTRARARE" ? (
                <RarityStar count={2} />
              ) : null}
            </span>
          </p>
          <img
            className="my-2 py-2 px-4"
            src={getHeadshot(player.playerId)}
            alt={player.firstName}
          />
        </Card>
      </motion.div>
    );
  }

  return (
    <Card className="!shadow-lg w-[200px] h-[300px] flex flex-col items-center py-4 hover:-translate-y-4 duration-300">
      <p className="w-5/6 text-left flex gap-2 items-center">
        {`${player.firstName} ${player.lastName}`}
        <span className="text-zinc-400 text-sm">
          {player.rarity === "NORMAL" ? null : player.rarity === "RARE" ? (
            <RarityStar count={1} />
          ) : player.rarity === "ULTRARARE" ? (
            <RarityStar count={2} />
          ) : null}
        </span>
      </p>
      <img
        className="my-2 py-2 px-4"
        src={getHeadshot(player.playerId)}
        alt={player.firstName}
      />
    </Card>
  );
}

function EmptyPlayerCard() {
  return <Card className="w-[200px] h-[300px]"></Card>;
}

export { PlayerCard, EmptyPlayerCard };
