import React from "react";
import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import { motion } from "motion/react";

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  backPath?: string;
  icon?: React.ReactNode;
  iconColor?: string;
}

export function PageLayout({ 
  children, 
  title, 
  subtitle, 
  backPath, 
  icon,
  iconColor = "bg-blue-600"
}: PageLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-[1000px] mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Standard Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-5">
            <button
              onClick={() => backPath ? navigate(backPath) : navigate(-1)}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300 hover:shadow-sm transition-all"
            >
              <ChevronLeft size={22} strokeWidth={2.5} />
            </button>
            
            {icon && (
              <div className={`w-14 h-14 ${iconColor} rounded-2xl flex items-center justify-center shadow-lg text-white`}>
                {icon}
              </div>
            )}
            
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{title}</h1>
              {subtitle && <p className="text-slate-500 font-medium mt-1">{subtitle}</p>}
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
