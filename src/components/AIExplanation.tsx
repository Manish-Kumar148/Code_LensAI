import React from "react";
import { Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AIExplanationProps {
  explanation: string;
}

export const AIExplanation: React.FC<AIExplanationProps> = ({ explanation }) => {
  return (
    <div className="h-48 flex flex-col bg-slate-900/50">
      <div className="px-4 py-2 bg-sidebar-bg border-b border-border flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-blue-400" />
        <span className="text-xs font-medium uppercase tracking-wider text-slate-400">AI Logic Explanation</span>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={explanation}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm text-slate-300 leading-relaxed font-sans"
          >
            {explanation || "Ready to trace your code. Click 'Run Trace' to start the visualization."}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
