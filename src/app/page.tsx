import Image from "next/image";
import Link from "next/link";

export default function Introduction() {
  return (
    <div className="intro-container flex items-center justify-center min-h-screen">
      <Link href="/player">Skip</Link>
    </div>
  );
}
