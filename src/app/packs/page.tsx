import { NoPack, Pack } from "@/components/pack";
import PageWrapper from "@/components/page-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createPack, getUser } from "@/lib/db";
import { Pack as PackPrismaType } from "@prisma/client";
import { revalidatePath } from "next/cache";

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
      <form
        action={async () => {
          "use server";
          await createPack("WILDWESTERNCONFERENCE", user.id);
          revalidatePath("/packs");
        }}
        className="fixed right-10"
      >
        <Button>Add pack (dev)</Button>
      </form>
      <div className="w-full flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <h2 className="font-bold text-2xl">My Packs</h2>
            <Badge variant="outline">New pack in 7:48</Badge>
          </div>
          <div className="flex gap-4">
            {user.packs.length <= 0 ? (
              <NoPack />
            ) : (
              user.packs.map((pack: PackPrismaType) => {
                if (pack.opened) {
                  return;
                }
                return <Pack key={pack.id} pack={pack} />;
              })
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
