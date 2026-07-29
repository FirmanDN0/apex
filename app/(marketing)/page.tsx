import { CTASection } from '@/features/landing/cta-section';
import { LandingHero } from '@/features/landing/hero';
import { ShowcaseSection } from '@/features/landing/showcase';
import { StatsSection } from '@/features/landing/stats-section';
import React from 'react';

export default function MarketingPage() {
  return (
    <div className="flex flex-col">
      <LandingHero />
      <StatsSection />
      <ShowcaseSection />
      <CTASection />
    </div>
  );
}
