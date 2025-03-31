import Link from "next/link";
import Image from "next/image";

function Logo() {
  return (
    <Link href="/">
      <Image
        src="/planIt.png"
        alt="Logo"
        width={160}
        height={40}
        className="object-contain invert  dark:invert-0"
      />
    </Link>
  );
}

export default Logo;
