import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ActivityLayout } from '../components/ActivityLayout';

// Loading Component
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen bg-slate-50">
    <div className="w-10 h-10 border-4 border-[#043570] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Helper to wrap activity — no TokenGuard needed, auth is handled globally by AuthProvider
const wrap = (Component: any, title: string) => (
  <ActivityLayout title={title}>
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  </ActivityLayout>
);

// Lazy imports
const AnxietyCycle = lazy(() => import('./anxiety-cycle'));
const BraveSteps = lazy(() => import('./brave-steps'));
const ClutterJournal = lazy(() => import('./clutter-journal'));
const DiscardIt = lazy(() => import('./discard-it'));
const DidYouKnow = lazy(() => import('./did-you-know'));
const LetterToOcd = lazy(() => import('./letter-to-ocd'));
const MirrorMoments = lazy(() => import('./mirror-moments'));
const OcdCycle = lazy(() => import('./ocd-cycle'));
const OcdDailyLife = lazy(() => import('./ocd-daily-life'));
const OneThingOut = lazy(() => import('./one-thing-out'));
const OcdSuccessStories = lazy(() => import('./ocd-success-stories'));
const ResponseGuide = lazy(() => import('./response-guide'));
const RitualCost = lazy(() => import('./ritual-cost'));
const SelfCompassion = lazy(() => import('./self-compassion'));
const ThoughtTruth = lazy(() => import('./thought-truth'));
const TriggerMap = lazy(() => import('./trigger-map'));
const TruthSeeker = lazy(() => import('./truth-seeker'));
const UncertaintyAcceptance = lazy(() => import('./uncertainty-acceptance'));
const UncertaintyTolerance = lazy(() => import('./uncertainty-tolerance'));

// Group B
const FearLadder = lazy(() => import('./fear-ladder'));
const MoodTracker = lazy(() => import('./mood-tracker'));
const OcdMoments = lazy(() => import('./ocd-moments'));
const ReassuranceResistance = lazy(() => import('./reassurance-resistance'));
const ThoughtDiffusion = lazy(() => import('./thought-diffusion'));
const UrgeSurfing = lazy(() => import('./urge-surfing'));

export const OCDActivities = () => {
  return (
    <Routes>
      <Route path="anxiety-cycle" element={wrap(AnxietyCycle, "Anxiety Cycle")} />
      <Route path="brave-steps" element={wrap(BraveSteps, "Brave Steps")} />
      <Route path="clutter-journal" element={wrap(ClutterJournal, "Emotion Journal")} />
      <Route path="discard-it" element={wrap(DiscardIt, "Discard It")} />
      <Route path="did-you-know" element={wrap(DidYouKnow, "Did You Know")} />
      <Route path="letter-to-ocd" element={wrap(LetterToOcd, "A Letter to My OCD")} />
      <Route path="mirror-moments" element={wrap(MirrorMoments, "Mirror Moments")} />
      <Route path="ocd-cycle" element={wrap(OcdCycle, "OCD Cycle")} />
      <Route path="ocd-daily-life" element={wrap(OcdDailyLife, "OCD In Daily Life")} />
      <Route path="one-thing-out" element={wrap(OneThingOut, "One Thing Out")} />
      <Route path="ocd-success-stories" element={wrap(OcdSuccessStories, "Success Stories")} />
      <Route path="response-guide" element={wrap(ResponseGuide, "Competing Response")} />
      <Route path="ritual-cost" element={wrap(RitualCost, "Ritual Cost Calculator")} />
      <Route path="self-compassion" element={wrap(SelfCompassion, "Self Compassion")} />
      <Route path="thought-truth" element={wrap(ThoughtTruth, "Thought or Truth")} />
      <Route path="trigger-map" element={wrap(TriggerMap, "My Trigger Map")} />
      <Route path="truth-seeker" element={wrap(TruthSeeker, "Truth Seeker Quiz")} />
      <Route path="uncertainty-acceptance" element={wrap(UncertaintyAcceptance, "Uncertainty Acceptance")} />
      <Route path="uncertainty-tolerance" element={wrap(UncertaintyTolerance, "Uncertainty Tolerance")} />

      {/* Group B */}
      <Route path="fear-ladder" element={wrap(FearLadder, "Fear Ladder")} />
      <Route path="mood-tracker" element={wrap(MoodTracker, "Mood Tracker")} />
      <Route path="ocd-moments" element={wrap(OcdMoments, "Log OCD Moments")} />
      <Route path="reassurance-resistance" element={wrap(ReassuranceResistance, "Reassurance Resistance")} />
      <Route path="thought-diffusion" element={wrap(ThoughtDiffusion, "Thought Diffusion")} />
      <Route path="urge-surfing" element={wrap(UrgeSurfing, "Urge Surfing")} />
    </Routes>
  );
};
