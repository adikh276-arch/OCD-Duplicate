// @ts-nocheck
import { useState } from 'react';
import { getWeekEntries } from '../lib/storage';
import { ArrowLeft, BarChart3, TrendingUp, Calendar, Info, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

const periods = (t: any) => [
  { label: t('insights.this_week'), weeksAgo: 0 },
  { label: t('insights.last_week'), weeksAgo: 1 },
  { label: t('insights.two_weeks_ago'), weeksAgo: 2 },
];

interface InsightsProps {
  onBack: () => void;
}

export default function Insights({ onBack }: InsightsProps) {
  const { t } = useTranslation();
  const currentPeriods = periods(t);
  const [periodIndex, setPeriodIndex] = useState(0);

  const { data: entries = [], isLoading } = useQuery({
    queryKey: ['weekEntries', currentPeriods[periodIndex].weeksAgo],
    queryFn: () => getWeekEntries(currentPeriods[periodIndex].weeksAgo)
  });

  const acted = entries.filter(e => e.response === 'acted').length;
  const waited = entries.filter(e => e.response === 'waited').length;
  const resisted = entries.filter(e => e.response === 'resisted').length;
  const total = entries.length;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col gap-8 pb-12"
    >
      <header className="pt-6">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4 text-xs font-bold uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {t('insights.back')}
        </button>
        <h1 className="font-display text-3xl font-bold text-foreground tracking-tight">{t('insights.title')}</h1>
        <p className="text-sm text-muted-foreground mt-1.5 font-light tracking-wide uppercase">{t('insights.subtitle')}</p>
      </header>

      {/* Period Selector Tabs */}
      <div className="flex bg-white/50 backdrop-blur-sm p-1.5 rounded-[2rem] border border-white/40 premium-shadow">
        {currentPeriods.map((p, i) => (
          <button
            key={i}
            onClick={() => setPeriodIndex(i)}
            className={`flex-1 py-3 px-4 rounded-[1.5rem] text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${i === periodIndex
              ? 'bg-foreground text-background shadow-lg'
              : 'text-muted-foreground hover:text-foreground'
              }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        {total === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-card rounded-[2.5rem] p-10 text-center flex flex-col items-center"
          >
            <div className="w-20 h-20 rounded-[2rem] bg-slate-50 flex items-center justify-center mb-6 shadow-xl shadow-black/5">
              <BarChart3 className="w-10 h-10 text-slate-300" />
            </div>
            <p className="font-display text-xl font-bold text-foreground">{t('insights.waiting_data')}</p>
            <p className="text-sm text-muted-foreground mt-2 font-light max-w-[200px] leading-relaxed">
              {t('insights.log_entries')}
            </p>

            <div className="mt-8 flex items-start gap-3 bg-rose-50/50 rounded-2xl p-4 text-left border border-rose-100/50">
              <Info className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <p className="text-[10px] text-rose-600/70 font-bold uppercase tracking-wider leading-relaxed">
                {t('insights.info')}
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="data"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-6"
          >
            {/* Stats Card */}
            <div className="glass-card rounded-[2.5rem] p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="flex items-center gap-1.5 text-primary mb-1">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{t('insights.activity')}</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-foreground">
                    {total} <span className="text-sm font-light text-muted-foreground tracking-normal lowercase italic">{t('insights.entry_flows')}</span>
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
              </div>

              <div className="space-y-6">
                <BarRow label={t('log.acted_label')} count={acted} total={total} color="bg-rose-500" iconBg="bg-rose-50" />
                <BarRow label={t('log.waited_label')} count={waited} total={total} color="bg-amber-500" iconBg="bg-amber-50" />
                <BarRow label={t('log.resisted_label')} count={resisted} total={total} color="bg-emerald-500" iconBg="bg-emerald-50" />
              </div>
            </div>

            {/* AI Pattern Card */}
            {total >= 4 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-foreground text-background rounded-[2.5rem] p-8 shadow-2xl shadow-foreground/20"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50">{t('insights.pattern_discovery')}</span>
                </div>
                <p className="font-display text-lg font-medium leading-relaxed italic opacity-90 underline decoration-primary/30 underline-offset-8">
                  {resisted > acted
                    ? `“${t('insights.pattern_resisted')}”`
                    : acted > resisted
                      ? `“${t('insights.pattern_acted')}”`
                      : `“${t('insights.pattern_balanced')}”`}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function BarRow({ label, count, total, color, iconBg }: { label: string; count: number; total: number; color: string; iconBg: string }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="space-y-2.5">
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-2.5">
          <div className={`w-2 h-2 rounded-full ${color}`} />
          <span className="text-[11px] font-bold text-foreground/80 lowercase tracking-widest">{label}</span>
        </div>
        <span className="text-[10px] font-bold text-muted-foreground font-mono">{count} ENTR{count === 1 ? 'Y' : 'IES'}</span>
      </div>
      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(pct, 5)}%` }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full rounded-full ${color} shadow-lg shadow-black/5`}
        />
      </div>
    </div>
  );
}
