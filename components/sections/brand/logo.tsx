import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  url: string;
}

export default function Logo({ url }: LogoProps) {
  return (
    <Link href={url}>
      <Image src={"/rhythms_logo.svg"} height={48} width={72} className="w-8" alt={"rhythms.today Logo"} />
    </Link>
  );
}
