import BrandButton from "@/components/ui/brand-button";
import Logo from "@/components/ui/logo";
import SecondaryButton from "@/components/ui/secondary-button";

export default function Home() {
  return (
    <div className="lg:mt-20 lg:w-1/2">
      <Logo url={"/"} />
      <p className="mt-12 leading-relaxed dark:text-neutral-400 text-neutral-600 text-lg">
        <span className="dark:text-neutral-100 text-neutral-900">Intentional daily goal tracking.</span> Set 
        goals on what to improve or do new each day, then mark them as complete, missed, or abandoned. Misses 
        include a quick note on why, and unmarked goals build up until resolved. rhythms isn’t about rigid habits
         or planning too far ahead—it gives you the structure to focus on what matters most day to day. 
         All your data is saved in a filterable calendar across days, weeks, months, and years, letting you 
         look back and share with family and friends what you were thinking and doing in different seasons of 
         life.
      </p>
      <p className="mt-5 mb-12 leading-relaxed dark:text-neutral-400 text-neutral-600 text-lg">
        rhythms is free to save two weeks at a time, or $20/year for full data retention, export, and custom auto-tagging.
      </p>
      <div className="mt-12 flex items-center gap-8">
        <BrandButton text="Get Started" />
        <SecondaryButton text="Log Back In" />
      </div>
    </div>
  );
}
