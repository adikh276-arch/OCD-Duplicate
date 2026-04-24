import { useState } from "react";
import { useTranslation } from "react-i18next";
import CycleWheel, { NODES } from "./CycleWheel";
import LanguageSwitcher from "./LanguageSwitcher";

const BreakCycleScreen = ({ onComplete }: { onComplete: () => void }) => {
  const { t } = useTranslation();
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [tappedNodes, setTappedNodes] = useState<Set<number>>(new Set());

  const tips = t('break_cycle.tips', { returnObjects: true }) as string[];

  const handleNodeTap = (index: number) => {
    setActiveNode(index === activeNode ? null : index);
    setTappedNodes((prev) => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  };

  const allTapped = tappedNodes.size === 5;

  return (
    <div className="flex flex-col min-h-screen px-6 py-8 text-center relative"
         style={{ background: 'linear-gradient(160deg, hsl(230 30% 96%), hsl(250 35% 94%), hsl(220 40% 95%))' }}>

      <LanguageSwitcher />

      <div className="flex-1 flex flex-col gap-5 overflow-y-auto pb-4">
        <h1 className="text-xl font-bold text-foreground mt-2">
          {t('break_cycle.title')}
        </h1>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {t('break_cycle.description')}
        </p>

        <CycleWheel
          interactive
          activeNode={activeNode}
          onNodeTap={handleNodeTap}
        />

        {/* Expanded card */}
        {activeNode !== null && (
          <div
            key={activeNode}
            className="rounded-2xl px-5 py-4 mx-auto max-w-xs animate-slide-up"
            style={{ background: 'linear-gradient(135deg, hsl(250 50% 95%), hsl(220 50% 94%))' }}
          >
            <p className="text-xs font-bold text-accent-foreground mb-2">
              {NODES[activeNode].emoji} {t(`nodes.${NODES[activeNode].key}.label`).toUpperCase()}
            </p>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {tips[activeNode]}
            </p>
          </div>
        )}

        {/* All tapped message */}
        {allTapped && (
          <p className="text-sm text-foreground/80 leading-relaxed animate-fade-up mt-2">
            {t('break_cycle.all_tapped')}
          </p>
        )}
      </div>

      {allTapped && (
        <button
          onClick={onComplete}
          className="w-full py-4 rounded-full text-primary-foreground font-bold text-lg shadow-lg active:scale-[0.98] transition-transform mt-4 animate-fade-up"
          style={{ background: 'linear-gradient(135deg, hsl(250 40% 55%), hsl(260 45% 60%))' }}
        >
          {t('break_cycle.button')}
        </button>
      )}
    </div>
  );
};

export default BreakCycleScreen;