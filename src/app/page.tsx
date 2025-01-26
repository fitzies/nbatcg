import { NoFriendIcon } from "@/components/friend-icon";
import PageWrapper from "@/components/page-wrapper";
import { EmptyPlayerCard, PlayerCard } from "@/components/player-card";
import { getUser } from "@/lib/db";
import { motion } from "framer-motion";

export default async function Page() {
  const user = await getUser(1);

  if (!user) {
    return (
      <PageWrapper className="h-[80vh] flex justify-center items-center">
        Something went wrong
      </PageWrapper>
    );
  }
  return (
    <PageWrapper>
      <div className="w-full flex flex-col gap-6">
        <div className="flex flex-col">
          <h1 className="font-bold text-3xl">Welcome, {user!.username}</h1>
          <p className="text-zinc-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
            laboriosam officiis itaque quis, harum porro sunt blanditiis dolores
            illum deleniti.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-2xl">My Cards</h2>
          <div className="grid lg:grid-cols-11 grid-cols-4 gap-4 group w-[98%]">
            {user.cards.length <= 0 ? (
              <EmptyPlayerCard />
            ) : (
              user.cards.map((card) => {
                return <PlayerCard key={card.id} player={card} />;
              })
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-2xl">My Friends</h2>
          <NoFriendIcon />
        </div>
      </div>
    </PageWrapper>
  );
}
