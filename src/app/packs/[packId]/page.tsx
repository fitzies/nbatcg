import OpenPack from "@/components/open-pack";
import PageWrapper from "@/components/page-wrapper";
import { getPack, setPackAsOpened } from "@/lib/db";

export default async function Page(props: {
  params: Promise<{ packId: string }>;
}) {
  const { packId } = await props.params;

  const pack = await getPack(packId);
  if (!pack) {
    return <PageWrapper>This pack does not exist</PageWrapper>;
  }
  await setPackAsOpened(pack.id);

  // Rendering the player cards
  return <OpenPack pack={pack} />;
}
