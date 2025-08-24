import LogBackInIcon from '@/components/icons/log-back-in-icon';
import PersonIcon from '@/components/icons/person-icon';
import LogoSite from '@/components/sections/brand/logo-site';
import { BrandButton } from '@/components/ui/brand-button';
import { SecondaryButton } from '@/components/ui/secondary-button';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="mt-4 lg:mt-20 lg:w-2/5 lg:ml-28">
        <LogoSite url={"/"} />
        <p className="mt-12 leading-loose dark:text-neutral-400 text-neutral-500">
          <span className="dark:text-neutral-100 text-neutral-950">Intentional daily goal tracking.</span> Set
          goals on what to improve or do new each day, then mark them as complete, missed, or abandoned. When you miss a goal, add a quick note on why—and
          if you leave goals unmarked, they build up until you resolve them. rhythms isn't about repeating the same habits
          or planning too far ahead—rather it gives you the structure to focus on what matters most day to day.
          All of your goals and notes are saved in a filterable calendar across days, weeks, months, and years so you can learn from your aims, balance, and consistency. Plus, down the road you'll be able to share with family and
          friends how you were thinking in different seasons of life.
        </p>
        <p className="mt-5 mb-8 leading-loose dark:text-neutral-400 text-neutral-500">
          rhythms is free with two weeks of history, or $20/year for unlimited retention, data export, and custom auto-tagging.
        </p>
        <div className="flex items-center gap-5">
          <Link href="/get-started">
            <BrandButton
              text="Get Started"
              className="w-52"
              icon={<PersonIcon/>}
            />
          </Link>
          <Link href="/log-back-in">
            <SecondaryButton
              text="Log Back In"
              className="w-52"
              icon={<LogBackInIcon/>}
            />
          </Link>
        </div>
      </div>
    </>
  );
}