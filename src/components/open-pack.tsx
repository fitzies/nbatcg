"use client";

import { Card, Pack } from "@prisma/client";
import PageWrapper from "./page-wrapper";
import { PlayerCard } from "./player-card";
import { useEffect, useState } from "react";
import LoadingSpinner from "./loading-spinner";
import ReactConfetti from "react-confetti";

export default function OpenPack({
  pack,
}: {
  pack: Pack & { players: Card[] };
}) {
  const [loading, setLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 1500); // Adjust timing as needed
  //   return () => clearTimeout(timer);
  // }, []);

  if (loading) {
    return (
      <PageWrapper className="w-screen h-[80vh] flex justify-center items-center">
        <LoadingSpinner />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper className="h-[80vh] flex justify-center items-center gap-4">
      <ReactConfetti
        width={5000}
        height={5000}
        className="mt-20"
        onConfettiComplete={() => {}}
      />
      {pack.players.map((card) => (
        <PlayerCard key={card.playerId} player={card} justOpened={true} />
      ))}
    </PageWrapper>
  );
}
