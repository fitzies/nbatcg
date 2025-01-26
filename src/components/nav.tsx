import Link from "next/link";

const NavItem = ({ text }: { text: string }) => {
  return (
    <Link
      href={"/" + (text === "Home" ? "" : text.toLowerCase())}
      className="text-zinc-400 hover:text-white duration-150"
    >
      {text}
    </Link>
  );
};

export default function Nav() {
  return (
    <nav className="w-screen px-8 py-6 border-b border-zinc-800 flex justify-center items-center gap-4">
      <NavItem text="Home" />
      <NavItem text="Collection" />
      <NavItem text="Packs" />
    </nav>
  );
}
