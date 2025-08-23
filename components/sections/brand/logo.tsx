import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  url: string;
}

export default function Logo({ url }: LogoProps) {
  return (
    <Link href={url} className="flex gap-2 items-center font-medium dark:text-neutral-100 text-neutral-900">
      <Image src={"/rhythms_logo.svg"} height={48} width={72} className="w-7" alt={"rhythms.today Logo"} />
      rhythms.today
    </Link>
  );
}
