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
      "welcome": {
        "badge": "QUIZ",
        "title": "Thought or Truth?",
        "description": "Learn to distinguish between intrusive thoughts and reality.",
        "details": "5 Questions • Interactive Practice",
        "button": "Let's Begin"
      },
      "before": {
        "title": "Before we start...",
        "p1": "OCD often blurs the line between a thought and a fact. Just because you have a thought doesn't mean it's true or that it will happen.",
        "p2": "In this exercise, you'll see statements. Swipe right if it's a 'Truth' (a fact), or left if it's a 'Thought' (an intrusive obsession).",
        "button": "I'm Ready"
      },
      "quiz": {
        "questionCount": "Question {{current}} of {{total}}",
        "falseHint": "THOUGHT",
        "trueHint": "TRUTH",
        "correct": "Correct!",
        "incorrect": "Not quite...",
        "continue": "Next Question"
      },
      "results": {
        "amazing": "Amazing Work!",
        "niceTry": "Good Effort!",
        "keepLearning": "Keep Practicing",
        "scoreMsg": "You scored {{score}} out of {{total}}",
        "heartsMsg": "Wellness:",
        "remember": "Remember: A thought is just a sequence of words or images in your mind. It doesn't define you.",
        "tryAgain": "Practice Again"
      },
      "questions": [
        {
          "q": "The stove is definitely on and the house will burn down.",
          "correctExplain": "Exactly. This is a classic 'what-if' obsession, not a confirmed fact.",
          "wrongExplain": "Actually, this is an intrusive thought. It's a fear-based projection, not a fact."
        },
        {
          "q": "My hands feel dry because I have washed them five times today.",
          "correctExplain": "Correct! This is a physical fact based on your actions.",
          "wrongExplain": "Actually, this is a observable truth about your physical state."
        },
        {
          "q": "If I don't tap the door three times, something bad will happen.",
          "correctExplain": "Yes! This is magical thinking — a thought, not a law of nature.",
          "wrongExplain": "This is a thought. There is no physical link between tapping and 'bad things'."
        },
        {
          "q": "I am currently holding a phone or sitting at a computer.",
          "correctExplain": "Correct. This is your current objective reality.",
          "wrongExplain": "Actually, this is a fact about your immediate surroundings."
        },
        {
          "q": "I am a bad person because I had an unwanted intrusive thought.",
          "correctExplain": "Correct. Your character is not defined by the content of intrusive thoughts.",
          "wrongExplain": "Intrusive thoughts are ego-dystonic. Having them doesn't make you 'bad'."
        }
      ],
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
