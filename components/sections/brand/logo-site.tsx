import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  url: string;
}

export default function LogoSite({ url }: LogoProps) {
  return (
    <Link href={url} className="flex gap-4 items-center font-bold dark:text-neutral-100 text-neutral-900 text-lg">
      <Image src={"/rhythms_logo.svg"} height={48} width={72} className="w-12" alt={"rhythms.today Logo"} />
      rhythms.today
    </Link>
  );
}
