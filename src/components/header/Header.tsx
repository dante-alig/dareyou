import MenuButton from "./MenuButton";
import Logo from "./Logo";
import UserButton from "./UserButton";

export default function Header() {
  return (
    <header className="w-full flex justify-between items-center p-4 text-white">
      <MenuButton />
      <Logo />
      <UserButton />
    </header>
  );
}
