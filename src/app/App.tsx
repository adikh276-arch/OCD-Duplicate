import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { OCDSelfCare } from "./features/ocd/pages/OCDSelfCare";
import { OCDPage } from "./features/ocd/pages/OCDPage";
import { HealthOCDPage } from "./features/ocd/pages/HealthOCDPage";
import { HoardingOCDPage } from "./features/ocd/pages/HoardingOCDPage";
import { CompulsiveHoardingArticle } from "./features/ocd/articles/CompulsiveHoardingArticle";
import { HoardingDisorderArticle } from "./features/ocd/articles/HoardingDisorderArticle";
import { OCDSymptomArticle } from "./features/ocd/articles/OCDSymptomArticle";
import { HoardingPhenotypeArticle } from "./features/ocd/articles/HoardingPhenotypeArticle";
import { HoardingControversiesArticle } from "./features/ocd/articles/HoardingControversiesArticle";
import { LifeBeyondPilesStory } from "./features/ocd/stories/LifeBeyondPilesStory";
import { JoanTeacherStory } from "./features/ocd/stories/JoanTeacherStory";
import { JeanneLeierStory } from "./features/ocd/stories/JeanneLeierStory";
import { ThatHoarderStory } from "./features/ocd/stories/ThatHoarderStory";
import { BrainBehindHoardingStory } from "./features/ocd/stories/BrainBehindHoardingStory";
import { TrichotillomaniaPage } from "./features/ocd/pages/TrichotillomaniaPage";
import { TrichMyth1 } from "./features/ocd/tips/TrichMyth1";
import { TrichMyth2 } from "./features/ocd/tips/TrichMyth2";
import { TrichMyth3 } from "./features/ocd/tips/TrichMyth3";
import { TrichMyth4 } from "./features/ocd/tips/TrichMyth4";
import { TrichMyth5 } from "./features/ocd/tips/TrichMyth5";
import { TrichArticle1 } from "./features/ocd/articles/TrichArticle1";
import { TrichArticle2 } from "./features/ocd/articles/TrichArticle2";
import { TrichArticle3 } from "./features/ocd/articles/TrichArticle3";
import { TrichArticle4 } from "./features/ocd/articles/TrichArticle4";
import { TrichArticle5 } from "./features/ocd/articles/TrichArticle5";
import { ContaminationOCDPage } from "./features/ocd/pages/ContaminationOCDPage";
import { ContaminationTip1 } from "./features/ocd/tips/ContaminationTip1";
import { ContaminationTip2 } from "./features/ocd/tips/ContaminationTip2";
import { ContaminationTip3 } from "./features/ocd/tips/ContaminationTip3";
import { ContaminationTip4 } from "./features/ocd/tips/ContaminationTip4";
import { ContaminationTip5 } from "./features/ocd/tips/ContaminationTip5";
import { ContaminationArticle1 } from "./features/ocd/articles/ContaminationArticle1";
import { ContaminationArticle2 } from "./features/ocd/articles/ContaminationArticle2";
import { ContaminationArticle3 } from "./features/ocd/articles/ContaminationArticle3";
import { ContaminationArticle4 } from "./features/ocd/articles/ContaminationArticle4";
import { ContaminationArticle5 } from "./features/ocd/articles/ContaminationArticle5";
import { PureOOCDPage } from "./features/ocd/pages/PureOOCDPage";
import { PureOArticle1 } from "./features/ocd/articles/PureOArticle1";
import { PureOArticle2 } from "./features/ocd/articles/PureOArticle2";
import { PureOArticle3 } from "./features/ocd/articles/PureOArticle3";
import { PureOArticle4 } from "./features/ocd/articles/PureOArticle4";
import { PureOArticle5 } from "./features/ocd/articles/PureOArticle5";
import { PureOStory1 } from "./features/ocd/stories/PureOStory1";
import { PureOStory2 } from "./features/ocd/stories/PureOStory2";
import { PureOStory3 } from "./features/ocd/stories/PureOStory3";
import { PureOStory4 } from "./features/ocd/stories/PureOStory4";
import { PureOStory5 } from "./features/ocd/stories/PureOStory5";
import { OCDActivities } from "./features/ocd/activities/OCDActivities";

function App() {
  return (
    <BrowserRouter basename="/ocd_selfcare">
      <Routes>
        <Route path="/" element={<OCDSelfCare />} />
        <Route path="/manage" element={<OCDPage />} />
        <Route path="/health-ocd" element={<HealthOCDPage />} />
        <Route path="/hoarding-ocd" element={<HoardingOCDPage />} />
        <Route path="/compulsive-hoarding-article" element={<CompulsiveHoardingArticle />} />
        <Route path="/hoarding-disorder-article" element={<HoardingDisorderArticle />} />
        <Route path="/ocd-symptom-article" element={<OCDSymptomArticle />} />
        <Route path="/hoarding-phenotype-article" element={<HoardingPhenotypeArticle />} />
        <Route path="/hoarding-controversies-article" element={<HoardingControversiesArticle />} />
        <Route path="/life-beyond-piles-story" element={<LifeBeyondPilesStory />} />
        <Route path="/joan-teacher-story" element={<JoanTeacherStory />} />
        <Route path="/jeanne-leier-story" element={<JeanneLeierStory />} />
        <Route path="/that-hoarder-story" element={<ThatHoarderStory />} />
        <Route path="/brain-behind-hoarding-story" element={<BrainBehindHoardingStory />} />
        <Route path="/trichotillomania" element={<TrichotillomaniaPage />} />
        <Route path="/trich-myth-1" element={<TrichMyth1 />} />
        <Route path="/trich-myth-2" element={<TrichMyth2 />} />
        <Route path="/trich-myth-3" element={<TrichMyth3 />} />
        <Route path="/trich-myth-4" element={<TrichMyth4 />} />
        <Route path="/trich-myth-5" element={<TrichMyth5 />} />
        <Route path="/trich-article-1" element={<TrichArticle1 />} />
        <Route path="/trich-article-2" element={<TrichArticle2 />} />
        <Route path="/trich-article-3" element={<TrichArticle3 />} />
        <Route path="/trich-article-4" element={<TrichArticle4 />} />
        <Route path="/trich-article-5" element={<TrichArticle5 />} />
        <Route path="/contamination-ocd" element={<ContaminationOCDPage />} />
        <Route path="/contamination-tip-1" element={<ContaminationTip1 />} />
        <Route path="/contamination-tip-2" element={<ContaminationTip2 />} />
        <Route path="/contamination-tip-3" element={<ContaminationTip3 />} />
        <Route path="/contamination-tip-4" element={<ContaminationTip4 />} />
        <Route path="/contamination-tip-5" element={<ContaminationTip5 />} />
        <Route path="/contamination-article-1" element={<ContaminationArticle1 />} />
        <Route path="/contamination-article-2" element={<ContaminationArticle2 />} />
        <Route path="/contamination-article-3" element={<ContaminationArticle3 />} />
        <Route path="/contamination-article-4" element={<ContaminationArticle4 />} />
        <Route path="/contamination-article-5" element={<ContaminationArticle5 />} />
        <Route path="/pure-o-ocd" element={<PureOOCDPage />} />
        <Route path="/pure-o-article-1" element={<PureOArticle1 />} />
        <Route path="/pure-o-article-2" element={<PureOArticle2 />} />
        <Route path="/pure-o-article-3" element={<PureOArticle3 />} />
        <Route path="/pure-o-article-4" element={<PureOArticle4 />} />
        <Route path="/pure-o-article-5" element={<PureOArticle5 />} />
        <Route path="/pure-o-story-1" element={<PureOStory1 />} />
        <Route path="/pure-o-story-2" element={<PureOStory2 />} />
        <Route path="/pure-o-story-3" element={<PureOStory3 />} />
        <Route path="/pure-o-story-4" element={<PureOStory4 />} />
        <Route path="/pure-o-story-5" element={<PureOStory5 />} />
{/* OCD Inline Activities */}
        <Route path="/activities/*" element={<OCDActivities />} />
        
        {/* Catch all redirect to root */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;