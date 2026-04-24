import { useTranslation } from "react-i18next";
import { Button } from "../../components/ui/button";
import MirrorSVG from "../components/MirrorSVG";
import LanguageSwitcher from "./LanguageSwitcher";

interface WelcomeScreenProps {
  onReady: () => void;
  onBack: () => void;
}

const WelcomeScreen = ({ onReady, onBack }: WelcomeScreenProps) => {
  const { t } = useTranslation();

  return (
    <div className="relative flex min-h-screen flex-col items-center bg-background bg-texture">
      <LanguageSwitcher />
      {/* Back button */}
      <button
        onClick={onBack}
        className="absolute left-4 top-4 text-muted-foreground font-body text-xl hover:text-foreground transition-colors"
        aria-label={t("welcome.back")}
      >
        ←
      </button>

      {/* Content */}
      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center max-w-[375px]">
        <h1 className="font-display text-4xl font-semibold text-warm-rose mb-4 leading-tight">
          {t("welcome.title")}
        </h1>

        <p className="font-body italic text-foreground/80 text-lg leading-relaxed mb-6 max-w-[300px]">
          {t("welcome.quote")}
        </p>

        <p className="font-body text-sm text-muted-foreground mb-10">
          {t("welcome.subtitle")}
        </p>

        <MirrorSVG />
      </div>

      {/* Bottom button */}
      <div className="w-full max-w-[375px] px-8 pb-10">
        <Button variant="warm" size="lg" className="w-full h-14 text-lg" onClick={onReady}>
          {t("welcome.button")}
        </Button>
      </div>
    </div>
  );
};


export default WelcomeScreen;
