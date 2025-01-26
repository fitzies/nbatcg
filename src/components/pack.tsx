import Link from "next/link";
import { Card } from "./ui/card";
import { Pack as PackPrismaType } from "@prisma/client";

function NoPack() {
  return <Card className="w-[220px] h-[320px]"></Card>;
}

function Pack({ pack }: { pack: PackPrismaType }) {
  let packName;
  if (pack.type === "EAGEREASTERNCONFERENCE")
    packName = "Eager Eastern Conference";
  if (pack.type === "WILDWESTERNCONFERENCE")
    packName = "Wild Western Conference";

  return (
    <Card className="w-[220px] h-[320px] flex justify-center items-start py-8 hover:-translate-y-1 duration-150 cursor-pointer">
      <Link className="w-full h-full" href={`packs/${pack.id}`}>
        <h1 className="text-sm text-zinc-400 font-semibold text-center">
          {packName}
        </h1>
      </Link>
    </Card>
  );
}

export { NoPack, Pack };
