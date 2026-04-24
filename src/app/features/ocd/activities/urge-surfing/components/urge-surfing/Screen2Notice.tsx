import { useState } from "react";
import { useTranslation } from "react-i18next";

type BodyLocation = "scalp" | "eyebrows" | "eyelashes";

interface Props {
  onNext: (location: BodyLocation, sensation: string) => void;
}

const Screen2Notice = ({ onNext }: Props) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<BodyLocation | null>(null);
  const [sensation, setSensation] = useState("");

  const locations: { value: BodyLocation; labelKey: string }[] = [
    { value: "scalp", labelKey: "screen2.location_scalp" },
    { value: "eyebrows", labelKey: "screen2.location_eyebrows" },
    { value: "eyelashes", labelKey: "screen2.location_eyelashes" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Step */}
      <div className="pt-6 px-6 text-center">
        <span className="text-[11px] text-hint tracking-wide">{t('screen2.step')}</span>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pt-8 text-center">
        <h2 className="text-[20px] font-medium text-foreground mb-3">{t('screen2.title')}</h2>
        <p className="text-[14px] text-muted-foreground leading-[1.7] mb-6">
          {t('screen2.body')}
        </p>

        {/* Location pills */}
        <div className="flex gap-2 justify-center mb-6">
          {locations.map((loc) => {
            const isSelected = selected === loc.value;
            return (
              <button
                key={loc.value}
                onClick={() => setSelected(loc.value)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] border transition-all active:scale-[0.96] ${
                  isSelected
                    ? "bg-accent border-primary text-secondary-foreground"
                    : "bg-surface border-border text-muted-foreground"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isSelected ? "bg-primary" : "bg-dot-unselected"
                  }`}
                />
                {t(loc.labelKey)}
              </button>
            );
          })}
        </div>

        {/* Sensation input */}
        <div className="text-left">
          <label className="text-[11px] text-hint italic mb-1.5 block">
            {t('screen2.sensation_label')}
          </label>
          <textarea
            value={sensation}
            onChange={(e) => setSensation(e.target.value)}
            placeholder={t('screen2.sensation_placeholder')}
            className="w-full bg-surface border border-border rounded-[10px] p-3 text-[14px] text-foreground placeholder:text-dot-unselected resize-none focus:outline-none focus:ring-1 focus:ring-primary/40 transition-shadow"
            rows={3}
          />
        </div>
      </div>

      {/* Button */}
      <div className="px-6 pb-8">
        <button
          onClick={() => selected && onNext(selected, sensation)}
          disabled={!selected}
          className="w-full h-12 bg-primary text-primary-foreground rounded-[14px] text-[15px] font-medium active:scale-[0.97] transition-transform disabled:opacity-40"
        >
          {t('screen2.next_button')}
        </button>
      </div>
    </div>
  );
};

export default Screen2Notice;
