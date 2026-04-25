import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { motion } from 'motion/react';

interface ActivityLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const ActivityLayout: React.FC<ActivityLayoutProps> = ({ children, title }) => {
  const navigate = useNavigate();

  const handleExit = () => {
    // Standard Exit Protocol: postMessage to web.mantracare.com
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'EXIT_ACTIVITY' }, 'https://web.mantracare.com');
    } else {
      // Fallback for standalone mode
      navigate("/manage");
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F8FB]">
      {/* Premium Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-3">
        <div className="max-w-[1000px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#043570] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">M</span>
            </div>
            {title && <h1 className="text-sm font-semibold text-slate-800 truncate">{title}</h1>}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExit}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors group"
          >
            <span className="text-xs font-medium group-hover:text-slate-900">Exit</span>
            <X size={14} className="group-hover:text-red-500" />
          </motion.button>
        </div>
      </header>

      {/* Activity Container */}
      <main className="max-w-[1000px] mx-auto min-h-[calc(100vh-60px)] relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};
