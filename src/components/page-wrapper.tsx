import { ReactNode } from "react";

export default function PageWrapper({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <main className={`${className} w-screen px-8 py-6`}>{children}</main>;
}
