'use client';

import { useState } from 'react';
import GetStarted from '@/components/sections/auth/get-started';
import LogBackIn from '@/components/sections/auth/log-back-in';
import LogoSite from '@/components/sections/brand/logo-site';
import { BrandButton } from '@/components/ui/brand-button';
import { SecondaryButton } from '@/components/ui/secondary-button';

export default function Home() {
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const [isLogBackInOpen, setIsLogBackInOpen] = useState(false);

  return (
    <>
      <div className="lg:mt-20 lg:w-1/2">
        <LogoSite url={"/"} />
        <p className="mt-12 leading-relaxed dark:text-neutral-400 text-neutral-600 text-lg">
          <span className="dark:text-neutral-100 text-neutral-900">Intentional daily goal tracking.</span> Set
          goals on what to improve or do new each day, then mark them as complete, missed, or abandoned. Misses
          include a quick note on why, and unmarked goals build up until resolved. rhythms isn't about rigid habits
          or planning too far ahead—it gives you the structure to focus on what matters most day to day.
          All your data is saved in a filterable calendar across days, weeks, months, and years, letting you
          look back and share with family and friends what you were thinking and doing in different seasons of
          life.
        </p>
        <p className="mt-5 mb-12 leading-relaxed dark:text-neutral-400 text-neutral-600 text-lg">
          rhythms is free to save two weeks at a time, or $20/year for full data retention, export, and custom auto-tagging.
        </p>
        <div className="mt-12 flex items-center gap-8">
          <BrandButton 
            text="Get Started"
            onClick={() => setIsGetStartedOpen(true)}
          />
          <SecondaryButton 
            text="Log Back In" 
            onClick={() => setIsLogBackInOpen(true)}
          />
        </div>
      </div>

      <GetStarted 
        isOpen={isGetStartedOpen}
        onClose={() => setIsGetStartedOpen(false)}
      />

      <LogBackIn 
        isOpen={isLogBackInOpen}
        onClose={() => setIsLogBackInOpen(false)}
      />
    </>
  );
}