import { useTranslation } from "react-i18next";
import { ArrowLeft, List } from "lucide-react";

interface Props {
  onBegin: () => void;
  onHistory: () => void;
  onBack: () => void;
}

const Screen1Welcome = ({ onBegin, onHistory, onBack }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Blob */}
      <div
        className="absolute bottom-[-40px] right-[-40px] w-[200px] h-[200px] rounded-full bg-blob opacity-80"
        aria-hidden
      />

      {/* Header */}
      <div className="flex items-center justify-between pt-4 px-6 relative z-10">
        <button onClick={onBack} className="text-muted-foreground active:scale-95 transition-transform p-1" aria-label={t('screen1.back_aria')}>
          <ArrowLeft size={20} />
        </button>
        <button onClick={onHistory} className="text-muted-foreground active:scale-95 transition-transform p-1" aria-label={t('screen1.history_aria')}>
          <List size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center relative z-10">
        <span className="text-[11px] tracking-[0.06em] text-secondary-foreground font-medium mb-3">
          {t('screen1.label')}
        </span>
        <h1 className="text-[22px] font-medium text-foreground mb-4 leading-tight" style={{ textWrap: "balance" }}>
          {t('screen1.title')}
        </h1>
        <p className="text-[14px] text-muted-foreground leading-[1.7] mb-4 max-w-[340px]">
          {t('screen1.body1')}
        </p>
        <p className="text-[14px] text-hint leading-[1.7] max-w-[340px]">
          {t('screen1.body2')}
        </p>
      </div>

      {/* Button */}
      <div className="px-6 pb-8 relative z-10">
        <button
          onClick={onBegin}
          className="w-full h-12 bg-primary text-primary-foreground rounded-[14px] text-[15px] font-medium active:scale-[0.97] transition-transform"
        >
          {t('screen1.begin_button')}
        </button>
      </div>
    </div>
  );
};

export default Screen1Welcome;
