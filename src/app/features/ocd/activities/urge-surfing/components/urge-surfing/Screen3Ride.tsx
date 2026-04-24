import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import WaveAnimation from "./WaveAnimation";

interface Props {
  onComplete: () => void;
}

const TOTAL_SECONDS = 90;

const Screen3Ride = ({ onComplete }: Props) => {
  const { t } = useTranslation();
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setElapsed((prev) => {
        if (prev + 1 >= TOTAL_SECONDS) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return TOTAL_SECONDS;
        }
        return prev + 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (elapsed >= TOTAL_SECONDS) {
      const t = setTimeout(onComplete, 800);
      return () => clearTimeout(t);
    }
  }, [elapsed, onComplete]);

  const remaining = TOTAL_SECONDS - elapsed;
  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const progress = elapsed / TOTAL_SECONDS;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="pt-6 px-6 text-center">
        <span className="text-[11px] text-hint tracking-wide">{t('screen3.step')}</span>
      </div>

      <div className="flex-1 px-6 pt-6 text-center flex flex-col">
        <h2 className="text-[20px] font-medium text-foreground mb-3">
          {t('screen3.title')}
        </h2>
        <p className="text-[14px] text-muted-foreground leading-[1.7] mb-4">
          {t('screen3.body')}
        </p>

        <WaveAnimation progress={progress} />

        {/* Breathing timer */}
        <div className="bg-accent rounded-[10px] py-3 px-4 mx-auto max-w-[240px] mt-2">
          <span className="text-[11px] text-secondary-foreground block mb-1">
            {t('screen3.breathe_label')}
          </span>
          <span className="text-[20px] font-medium text-primary tabular-nums">
            {mins}:{secs.toString().padStart(2, "0")}
          </span>
        </div>

        <div className="mt-auto pb-8">
          <p className="text-[11px] text-hint italic">
            {t('screen3.footer')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Screen3Ride;
