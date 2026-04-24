// @ts-nocheck
import { useState } from 'react';
import LogForm from './components/LogForm';
import History from './components/History';
import Insights from './components/Insights';
import { TrendingUp, PenLine, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './components/LanguageSwitcher';

type Tab = 'log' | 'history' | 'insights';

const Index = () => {
  const [tab, setTab] = useState<Tab>('log');
  const { t } = useTranslation();

  if (tab === 'insights') {
    return (
      <div className="min-h-screen bg-background">
        <div className="container max-w-lg mx-auto px-5">
          <Insights onBack={() => setTab('log')} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex flex-col items-center">
      <div className="w-full max-w-lg flex flex-col min-h-screen border-x border-slate-50 shadow-sm bg-white relative">
        <div className="absolute top-6 right-6 z-20">
          <LanguageSwitcher />
        </div>

        <header className="px-6 pt-20 pb-8 flex flex-col gap-6 border-b border-slate-50">
          <div className="flex flex-col items-start gap-8 w-full">
            <div className="w-full">
              <h2 className="font-display text-4xl font-extrabold text-foreground tracking-tighter leading-[0.9] break-words hyphens-auto">
                {t('index.title').split(' ').map((word, i) => (
                  <span key={i} className="block">{word}</span>
                ))}
              </h2>
              <p className="text-[10px] text-muted-foreground font-black tracking-[0.3em] uppercase opacity-40 mt-4 break-words">{t('index.subtitle')}</p>
            </div>
            <div className="flex flex-wrap gap-2 pb-1 w-full">
              <button
                onClick={() => setTab(tab === 'history' ? 'log' : 'history')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 border ${tab === 'history'
                  ? 'bg-slate-100 text-slate-900 border-slate-200'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
              >
                {tab === 'history' ? <PenLine className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                {tab === 'history' ? t('index.journal') : t('index.history')}
              </button>
              <button
                onClick={() => setTab('insights')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-950 text-white text-[10px] font-black uppercase tracking-widest transition-all hover:bg-slate-800 active:scale-95 shadow-lg shadow-slate-200"
              >
                <TrendingUp className="w-3.5 h-3.5" />
                {t('index.analytics')}
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 px-6 py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {tab === 'log' ? <LogForm /> : <History />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Index;
