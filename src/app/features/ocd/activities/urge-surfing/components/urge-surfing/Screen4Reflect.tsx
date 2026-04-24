import { useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  onSurfAgain: (reflection: string) => void;
  onDone: (reflection: string) => void;
}

const Screen4Reflect = ({ onSurfAgain, onDone }: Props) => {
  const { t } = useTranslation();
  const [reflection, setReflection] = useState("");

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Blob */}
      <div
        className="absolute top-[-40px] right-[-40px] w-[160px] h-[160px] rounded-full bg-blob opacity-80"
        aria-hidden
      />

      <div className="pt-6 px-6 text-center relative z-10">
        <span className="text-[11px] text-hint tracking-wide">{t('screen4.step')}</span>
      </div>

      <div className="flex-1 px-6 pt-8 text-center relative z-10">
        <h2 className="text-[20px] font-medium text-foreground mb-3">
          {t('screen4.title')}
        </h2>
        <p className="text-[14px] text-muted-foreground leading-[1.7] mb-6">
          {t('screen4.body')}
        </p>

        {/* Reflection input */}
        <div className="bg-surface border border-border rounded-[10px] p-3 text-left mb-4">
          <label className="text-[11px] text-hint block mb-2">
            {t('screen4.reflection_label')}
          </label>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            className="w-full bg-card border border-border rounded-lg h-[60px] p-2 text-[14px] text-foreground resize-none focus:outline-none focus:ring-1 focus:ring-primary/40 transition-shadow"
          />
        </div>

        <p className="text-[11px] text-hint italic">
          {t('screen4.footer')}
        </p>
      </div>

      {/* Buttons */}
      <div className="px-6 pb-8 flex gap-3 relative z-10">
        <button
          onClick={() => onSurfAgain(reflection)}
          className="flex-1 h-12 bg-surface border border-border text-secondary-foreground rounded-xl text-[15px] font-medium active:scale-[0.97] transition-transform"
        >
          {t('screen4.surf_again_button')}
        </button>
        <button
          onClick={() => onDone(reflection)}
          className="flex-1 h-12 bg-primary text-primary-foreground rounded-xl text-[15px] font-medium active:scale-[0.97] transition-transform"
        >
          {t('screen4.done_button')}
        </button>
      </div>
    </div>
  );
};

export default Screen4Reflect;
