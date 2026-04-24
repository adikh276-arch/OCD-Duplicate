// @ts-nocheck
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Zap, Clock, Shield, MapPin, Calendar, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';

const responseConfig = (t: any): Record<string, { label: string, icon: any, color: string, lightBg: string, text: string }> => ({
  acted: { label: t('log.acted_label'), icon: Zap, color: 'bg-rose-500', lightBg: 'bg-rose-100', text: 'text-rose-700' },
  waited: { label: t('log.waited_label'), icon: Clock, color: 'bg-amber-500', lightBg: 'bg-amber-100', text: 'text-amber-700' },
  resisted: { label: t('log.resisted_label'), icon: Shield, color: 'bg-emerald-500', lightBg: 'bg-emerald-100', text: 'text-emerald-700' },
});

const locationLabels = (t: any): Record<string, string> => ({ 
  home: t('log.home'), 
  work: t('log.work'), 
  social: t('log.social'), 
  other: t('log.other') 
});

import { useActivityDB } from '../../../hooks/useActivityDB';

export default function History() {
  const { t } = useTranslation();
  const currentResponseConfig = responseConfig(t);
  const currentLocationLabels = locationLabels(t);
  const [grouped, setGrouped] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { executeQuery } = useActivityDB("ocd-moments");

  const fetchData = async () => {
    setIsLoading(true);
    const data = await executeQuery("get_grouped_entries", {});
    if (data) setGrouped(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const days = Object.keys(grouped).sort((a, b) => b.localeCompare(a));
  const [dayIndex, setDayIndex] = useState(0);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-32">
        <Loader2 className="w-8 h-8 animate-spin text-slate-300" />
      </div>
    );
  }

  if (days.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-32 text-center"
      >
        <div className="w-20 h-20 rounded-[2.5rem] bg-slate-50 flex items-center justify-center mb-6 shadow-xl shadow-slate-900/5">
          <Clock className="w-10 h-10 text-slate-300" />
        </div>
        <p className="font-display text-xl font-bold text-slate-400">{t('history.no_entries')}</p>
        <p className="text-sm text-slate-300 mt-1 uppercase tracking-widest font-bold">{t('history.start_today')}</p>
      </motion.div>
    );
  }

  const currentDay = days[dayIndex];
  const entries = grouped[currentDay] || [];

  // Handle invalid dates securely
  let dateLabel = currentDay;
  try {
    dateLabel = format(new Date(currentDay + 'T00:00:00'), 'EEEE, MMMM do');
  } catch (e) {
    console.error("Invalid date", currentDay);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-8 pb-12"
    >
      <header>
        <h1 className="font-display text-3xl font-bold text-foreground tracking-tight">{t('history.title')}</h1>
        <p className="text-[10px] text-muted-foreground font-bold tracking-[0.3em] uppercase opacity-60 mt-1">{t('history.subtitle')}</p>
      </header>

      {/* Day Selector */}
      <div className="flex items-center justify-between bg-white border-2 border-slate-50 rounded-[2rem] p-2">
        <button
          onClick={() => setDayIndex(i => Math.min(i + 1, days.length - 1))}
          disabled={dayIndex >= days.length - 1}
          className="w-12 h-12 flex items-center justify-center rounded-2xl hover:bg-slate-50 disabled:opacity-20 transition-all active:scale-90"
        >
          <ChevronLeft className="w-5 h-5 text-slate-900" />
        </button>

        <div className="flex flex-col items-center gap-0.5 px-4 text-center">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Calendar className="w-3.5 h-3.5" />
            <span className="text-[9px] font-black uppercase tracking-widest leading-none">{t('history.journal_date')}</span>
          </div>
          <p className="font-display text-sm font-bold text-slate-900">{dateLabel}</p>
        </div>

        <button
          onClick={() => setDayIndex(i => Math.max(i - 1, 0))}
          disabled={dayIndex <= 0}
          className="w-12 h-12 flex items-center justify-center rounded-2xl hover:bg-slate-50 disabled:opacity-20 transition-all active:scale-90"
        >
          <ChevronRight className="w-5 h-5 text-slate-900" />
        </button>
      </div>

      {/* Entries List */}
      <div className="grid gap-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDay}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="grid gap-4"
          >
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="bg-white border-2 border-slate-50 p-6 rounded-[2rem] flex flex-col gap-4 shadow-sm shadow-slate-100/50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span className="text-[9px] font-bold text-slate-600 uppercase tracking-wider">
                      {entry.location === 'other' ? (entry.customLocation || t('log.other')) : currentLocationLabels[entry.location]}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-300 font-bold">
                    {format(new Date(entry.timestamp), 'h:mm a')}
                  </span>
                </div>

                <p className="text-sm text-slate-900 font-medium leading-relaxed italic">
                  "{entry.urge}"
                </p>

                <div className="flex items-center gap-3 pt-3 border-t border-slate-50">
                  <div className={`w-2 h-2 rounded-full ${currentResponseConfig[entry.response]?.color || 'bg-slate-200'}`} />
                  <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">
                    {currentResponseConfig[entry.response]?.label || entry.response}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

