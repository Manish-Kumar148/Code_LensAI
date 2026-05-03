import React from "react";
import { motion, AnimatePresence } from "motion/react";

interface VariablePanelProps {
  variables: Record<string, any>;
}

export const VariablePanel: React.FC<VariablePanelProps> = ({ variables }) => {
  return (
    <div className="flex-1 min-h-0 flex flex-col border-b border-border">
      <div className="px-4 py-2 bg-sidebar-bg border-b border-border flex justify-between items-center">
        <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Variables</span>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-sm">
        <AnimatePresence mode="popLayout">
          {Object.entries(variables).length === 0 ? (
            <span className="text-slate-500 italic">No variables in current scope</span>
          ) : (
            Object.entries(variables).map(([key, value]) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex items-start gap-3 group"
              >
                <span className="text-blue-400 min-w-[80px] shrink-0 font-medium">{key}</span>
                <span className="text-slate-400">=</span>
                <motion.span
                  key={`${key}-${JSON.stringify(value)}`}
                  initial={{ backgroundColor: "rgba(59, 130, 246, 0.3)" }}
                  animate={{ backgroundColor: "transparent" }}
                  transition={{ duration: 0.8 }}
                  className="px-1 rounded"
                >
                  {typeof value === "object" ? JSON.stringify(value) : String(value)}
                </motion.span>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
