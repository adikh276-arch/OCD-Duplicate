import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

interface WelcomeScreenProps {
  onNext: () => void;
}

const WelcomeScreen = ({ onNext }: WelcomeScreenProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen px-6 py-8 text-center relative"
         style={{ background: 'linear-gradient(160deg, hsl(230 30% 96%), hsl(250 35% 94%), hsl(220 40% 95%))' }}>

      <LanguageSwitcher />

      {/* Back button */}
      <button className="absolute top-6 left-5 w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground/70 text-lg">
        ←
      </button>

      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <h1 className="text-2xl font-bold text-foreground">
          {t('welcome.title')}
        </h1>

        <p className="text-muted-foreground italic text-base leading-relaxed max-w-xs">
          "{t('welcome.description')}"
        </p>

        <p className="text-sm text-muted-foreground/70">{t('welcome.read_time')}</p>

        {/* Decorative bubbles (omitted for brevity in this replace call, but keeping logic) */}
        <div className="relative w-48 h-36 mx-auto">
          <div className="absolute w-16 h-16 rounded-full opacity-60 top-2 left-4"
               style={{ background: 'hsl(250 40% 82%)' }} />
          <div className="absolute w-10 h-10 rounded-full opacity-50 top-0 right-6"
               style={{ background: 'hsl(220 50% 85%)' }} />
          <div className="absolute w-20 h-20 rounded-full opacity-40 bottom-0 left-12"
               style={{ background: 'hsl(250 50% 88%)' }} />
          <div className="absolute w-8 h-8 rounded-full opacity-50 top-12 right-2"
               style={{ background: 'hsl(240 45% 80%)' }} />
          <div className="absolute w-12 h-12 rounded-full opacity-35 bottom-2 right-10"
               style={{ background: 'hsl(260 40% 84%)' }} />
          <div className="absolute w-6 h-6 rounded-full opacity-45 top-16 left-2"
               style={{ background: 'hsl(230 50% 82%)' }} />
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full py-4 rounded-full text-primary-foreground font-bold text-lg shadow-lg"
        style={{ background: 'linear-gradient(135deg, hsl(250 40% 55%), hsl(260 45% 60%))' }}
      >
        {t('welcome.button')}
      </button>
    </div>
  );
};

export default WelcomeScreen;
