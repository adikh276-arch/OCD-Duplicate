// @ts-nocheck
import { useState, useEffect } from 'react';
import { Home, Briefcase, Users, MapPin, Zap, Clock, Shield, Plus, History as HistoryIcon, ArrowRight, Loader2 } from 'lucide-react';
import { useActivityDB } from '../../../hooks/useActivityDB';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const locations = (t: any) => [
  { key: 'home' as const, label: t('log.home'), icon: Home, color: 'bg-amber-100 text-amber-600' },
  { key: 'work' as const, label: t('log.work'), icon: Briefcase, color: 'bg-indigo-100 text-indigo-600' },
  { key: 'social' as const, label: t('log.social'), icon: Users, color: 'bg-emerald-100 text-emerald-600' },
  { key: 'other' as const, label: t('log.other'), icon: MapPin, color: 'bg-rose-100 text-rose-600' },
];

const responses = (t: any) => [
  { key: 'acted' as const, label: t('log.acted_label'), desc: '...', icon: Zap, bgColor: 'bg-rose-100', iconBg: 'bg-rose-500', textColor: 'text-rose-700' },
  { key: 'waited' as const, label: t('log.waited_label'), desc: '...', icon: Clock, bgColor: 'bg-amber-100', iconBg: 'bg-amber-500', textColor: 'text-amber-700' },
  { key: 'resisted' as const, label: t('log.resisted_label'), desc: '...', icon: Shield, bgColor: 'bg-emerald-100', iconBg: 'bg-emerald-500', textColor: 'text-emerald-700' },
];

export default function LogForm() {
  const { t, i18n } = useTranslation();
  const currentLocations = locations(t);
  const currentResponses = responses(t);

  const [location, setLocation] = useState<typeof currentLocations[number]['key'] | null>(null);
  const [customLocationName, setCustomLocationName] = useState('');
  const [urge, setUrge] = useState('');
  const [response, setResponse] = useState<typeof currentResponses[number]['key'] | null>(null);
  const [saving, setSaving] = useState(false);
  const [recentEntries, setRecentEntries] = useState([]);

  const { executeQuery } = useActivityDB("ocd-moments");

  const fetchRecent = async () => {
    if (!location) return;
    const data = await executeQuery("get_recent", { location });
    if (data) setRecentEntries(data);
  };

  useEffect(() => {
    fetchRecent();
  }, [location]);

  const isValid = location && urge.trim() && response && (location !== 'other' || customLocationName.trim());

  const handleSave = async () => {
    if (!isValid || saving) return;
    setSaving(true);
    const success = await executeQuery("save_entry", {
      location,
      urge: urge.trim(),
      response,
      customLocation: location === 'other' ? customLocationName.trim() : undefined
    });

    if (success) {
      setLocation(null);
      setCustomLocationName('');
      setUrge('');
      setResponse(null);
      toast.success(t('log.success_title'), {
        description: t('log.success_desc'),
        className: 'glass-card border-emerald-100'
      });
    } else {
      toast.error(t('log.error_title'), {
        description: t('log.error_desc'),
      });
    }
    setSaving(false);
  };

  const today = new Date().toLocaleDateString(i18n.language, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-10"
    >
      {/* Date Header */}
      <header>
        <h1 className="font-display text-4xl font-extrabold text-foreground tracking-tight leading-none">
          {today}
        </h1>
        <div className="h-1 w-12 bg-primary mt-4 rounded-full" />
      </header>

      {/* Location Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
          <h2 className="text-[11px] font-black text-slate-900 tracking-[0.2em] uppercase">{t('log.context')}</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {currentLocations.map((loc) => {
            const Icon = loc.icon;
            const active = location === loc.key;
            return (
              <button
                key={loc.key}
                onClick={() => setLocation(loc.key)}
                className={`flex flex-col items-center gap-4 p-6 rounded-[2rem] transition-all duration-300 border-2 ${active
                  ? 'bg-slate-950 border-slate-950 text-white shadow-xl shadow-slate-200'
                  : 'bg-white border-slate-50 hover:border-slate-200 text-slate-400'
                  }`}
              >
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${active ? 'text-white' : loc.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">{loc.label}</span>
              </button>
            );
          })}
        </div>

        {/* Custom Location Input */}
        <AnimatePresence>
          {location === 'other' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="px-1">
                <input
                  type="text"
                  value={customLocationName}
                  onChange={(e) => setCustomLocationName(e.target.value)}
                  placeholder={t('log.custom_placeholder')}
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-slate-200 transition-all font-medium"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Urge Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
          <h2 className="text-[11px] font-black text-slate-900 tracking-[0.2em] uppercase">{t('log.observation')}</h2>
        </div>

        <div className="relative">
          <textarea
            value={urge}
            onChange={e => setUrge(e.target.value)}
            placeholder={t('log.urge_placeholder')}
            rows={5}
            className="w-full bg-slate-50 border-none rounded-[2rem] px-8 py-7 text-base font-body leading-relaxed placeholder:text-slate-300 focus:ring-2 focus:ring-slate-200 transition-all resize-none italic"
          />
        </div>
      </section>

      {/* Contextual History */}
      <AnimatePresence>
        {location && recentEntries.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 px-1">
              <HistoryIcon className="w-3.5 h-3.5 text-slate-300" />
              <h3 className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">
                {t('log.previous_notes', { location: t(`log.${location}`) })}
              </h3>
            </div>
            <div className="grid gap-2">
              {recentEntries.map((entry) => (
                <button
                  key={entry.id}
                  onClick={() => setUrge(entry.urge)}
                  className="flex items-center justify-between bg-white border border-slate-50 p-5 rounded-2xl text-left hover:bg-slate-50 transition-colors group"
                >
                  <p className="text-xs text-slate-500 truncate pr-4 font-medium uppercase tracking-tight">"{entry.urge}"</p>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-200 group-hover:text-slate-900 transition-colors" />
                </button>
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Response Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
          <h2 className="text-[11px] font-black text-slate-900 tracking-[0.2em] uppercase">{t('log.decision')}</h2>
        </div>

        <div className="grid gap-3 pb-10">
          {currentResponses.map((r) => {
            const active = response === r.key;
            const Icon = r.icon;
            return (
              <button
                key={r.key}
                onClick={() => setResponse(r.key)}
                className={`flex items-center gap-5 p-6 rounded-[2rem] transition-all duration-300 text-left border-2 ${active
                  ? 'bg-slate-50 border-slate-900'
                  : 'bg-white border-slate-50 hover:bg-slate-50/50'
                  }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${active ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-400'}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-[13px] font-black uppercase tracking-wider ${active ? 'text-slate-900' : 'text-slate-400'}`}>{r.label}</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${active ? 'border-slate-900 bg-slate-900' : 'border-slate-100'
                  }`}>
                  {active && <ArrowRight className="w-3.5 h-3.5 text-white" />}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Save Button */}
      <footer className="pt-2 sticky bottom-2 z-10">
        <button
          onClick={handleSave}
          disabled={!isValid || saving}
          className="w-full py-6 rounded-[2rem] bg-slate-950 text-white font-black text-sm uppercase tracking-[0.2em] transition-all active:scale-[0.98] disabled:opacity-10 shadow-2xl shadow-slate-400 flex items-center justify-center gap-2"
        >
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : t('log.complete_session')}
        </button>
      </footer>
    </motion.div>
  );
}
