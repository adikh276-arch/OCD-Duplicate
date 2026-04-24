import { useNavigate, useSearchParams } from "react-router";
import { ChevronLeft, Share2, Maximize2, RefreshCcw } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

export function ToolView() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const url = searchParams.get("url");
  const title = searchParams.get("title") || "MantraCare Tool";
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!url) {
      navigate("/ocd-self-care");
    }
  }, [url, navigate]);

  if (!url) return null;

  return (
    <div className="flex flex-col h-screen bg-[#F9FAFB]">
      {/* Tool Header */}
      <div className="bg-white border-b border-[#E2E8F0] px-4 md:px-6 py-3 flex items-center justify-between z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-9 h-9 rounded-lg text-[#64748B] hover:text-[#043570] hover:bg-[#F1F5F9] transition-all"
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>
          <div>
            <h1 className="text-base font-semibold text-[#0F172A]">{title}</h1>
            <p className="text-[10px] text-[#64748B] font-medium uppercase tracking-wider">MantraCare Internal Tool</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => window.location.reload()}
            className="p-2 text-[#64748B] hover:text-[#043570] hover:bg-[#F1F5F9] rounded-lg transition-all"
            title="Refresh"
          >
            <RefreshCcw size={18} />
          </button>
          <button 
            className="p-2 text-[#64748B] hover:text-[#043570] hover:bg-[#F1F5F9] rounded-lg transition-all"
            title="Full Screen"
          >
            <Maximize2 size={18} />
          </button>
        </div>
      </div>

      {/* Tool Content */}
      <div className="flex-1 relative overflow-hidden bg-white">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-20">
            <div className="w-12 h-12 border-4 border-[#00c0ff]/20 border-t-[#00c0ff] rounded-full animate-spin mb-4"></div>
            <p className="text-sm font-medium text-[#64748B]">Loading secure session...</p>
          </div>
        )}
        <iframe
          src={url}
          className="w-full h-full border-none"
          onLoad={() => setIsLoading(false)}
          allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        />
      </div>

      {/* Bottom Status Bar */}
      <div className="bg-white border-t border-[#E2E8F0] px-4 py-2 flex items-center justify-between text-[10px] text-[#94A3B8] font-medium">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
          SECURE CONNECTION ESTABLISHED
        </div>
        <div>
          PROTECTED BY MANTRACARE ENCRYPTION
        </div>
      </div>
    </div>
  );
}
