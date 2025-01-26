import OpenPack from "@/components/open-pack";
import PageWrapper from "@/components/page-wrapper";
import { getPack, setPackAsOpened } from "@/lib/db";
import { openPack } from "@/utils/players";

export default async function Page({ params }: { params: { packId: string } }) {
  const pack = await getPack(params.packId);
  if (!pack) {
    return <PageWrapper>This pack does not exist</PageWrapper>;
  }
  await setPackAsOpened(pack.id);

  // Rendering the player cards
  return <OpenPack pack={pack} />;
}
