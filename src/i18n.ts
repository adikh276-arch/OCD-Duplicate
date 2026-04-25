import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Standard translations for OCD Self-Care module
const resources = {
  en: {
    translation: {
      "index": {
        "title": "Log OCD Moments",
        "subtitle": "Mindfulness in Action",
        "journal": "New Entry",
        "history": "History",
        "analytics": "Insights"
      },
      "log": {
        "context": "WHERE ARE YOU?",
        "observation": "WHAT IS THE URGE?",
        "decision": "YOUR RESPONSE",
        "home": "Home",
        "work": "Work",
        "social": "Social",
        "other": "Other",
        "custom_placeholder": "Specify location...",
        "urge_placeholder": "I'm having a thought about...",
        "acted_label": "Acted on compulsion",
        "waited_label": "Delayed/Sat with it",
        "resisted_label": "Resisted fully",
        "previous_notes": "PREVIOUS AT {{location}}",
        "success_title": "Moment Logged",
        "success_desc": "Every act of awareness is a step toward freedom.",
        "error_title": "Save Failed",
        "error_desc": "Please try again.",
        "complete_session": "Save Moment"
      },
      "screen1": {
        "label": "MINDFULNESS PRACTICE",
        "title": "Urge Surfing",
        "body1": "An urge is like an ocean wave. It starts small, builds to a peak, and then inevitably subsides.",
        "body2": "Instead of fighting the wave or being pulled under, we practice 'surfing' — staying present without acting.",
        "begin_button": "Start Surfing",
        "back_aria": "Go back",
        "history_aria": "View history"
      },
      "screen2": {
        "step": "STEP 1: NOTICE",
        "title": "Where is the urge?",
        "body": "Scan your body. Where do you feel the physical sensation of the urge?",
        "sensation_label": "I feel it in my...",
        "sensation_placeholder": "e.g., chest, hands, stomach",
        "next_button": "I Notice It"
      },
      "screen3": {
        "step": "STEP 2: RIDE",
        "title": "Stay on the board",
        "body": "The urge is peaking. It's uncomfortable, but it's just a sensation. It cannot harm you.",
        "breathe_label": "Breathe into the sensation. Let it be there.",
        "footer": "Surfing for {{seconds}}s..."
      },
      "screen4": {
        "step": "STEP 3: REFLECT",
        "title": "The wave has passed",
        "body": "You didn't act on the urge. You stayed present. How do you feel now?",
        "reflection_label": "Notes on this wave...",
        "footer": "You've survived 100% of your urges so far.",
        "surf_again_button": "Surf Another Wave",
        "done_button": "Finish Practice"
      },
      "screen5": {
        "header_label": "YOUR JOURNEY",
        "sessions_count": "{{count}} waves surfed",
        "title": "Recent Surfs",
        "empty_message": "Your surf history will appear here.",
        "completed": "Rode the wave",
        "partial": "Brief surf"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;
