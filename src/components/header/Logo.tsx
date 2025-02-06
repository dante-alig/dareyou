import Image from "next/image";

export default function Logo() {
  return (
    <div className="h-10 w-40 relative">
      <Image
        src="/ghost.png"
        alt="Ghost Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}
