import React from "react";
import { Play, SkipForward, RotateCcw, Loader2 } from "lucide-react";
import { motion } from "motion/react";

interface ControlPanelProps {
  onRun: () => void;
  onNext: () => void;
  onReset: () => void;
  isRunning: boolean;
  isTracing: boolean;
  currentStep: number;
  totalSteps: number;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  onRun,
  onNext,
  onReset,
  isRunning,
  isTracing,
  currentStep,
  totalSteps,
}) => {
  return (
    <div className="h-16 border-t border-border bg-sidebar-bg flex items-center px-6 gap-6">
      <div className="flex gap-2">
        {!isRunning ? (
          <button
            onClick={onRun}
            disabled={isTracing}
            className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-md text-sm font-medium transition-colors"
          >
            {isTracing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4 fill-current" />
            )}
            Run Trace
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={onNext}
              disabled={currentStep >= totalSteps - 1}
              className="flex items-center gap-2 px-4 py-1.5 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white rounded-md text-sm font-medium transition-colors"
            >
              <SkipForward className="w-4 h-4" />
              Next Step
            </button>
            <button
              onClick={onReset}
              className="flex items-center gap-2 px-4 py-1.5 border border-border hover:bg-slate-800 text-white rounded-md text-sm font-medium transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 flex items-center gap-4 max-w-xl group">
        <span className="text-xs text-slate-400 font-mono w-24">
          Step {(currentStep + 1).toString().padStart(2, '0')} / {totalSteps.toString().padStart(2, '0')}
        </span>
        <div className="relative flex-1 flex items-center">
          <input
            type="range"
            min="0"
            max={totalSteps > 0 ? totalSteps - 1 : 0}
            value={currentStep}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              // This requires passing a jump function from parent
              (window as any).jumpToStep?.(val);
            }}
            disabled={totalSteps === 0}
            className="w-full h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all"
          />
          <motion.div
            initial={false}
            animate={{ width: `${totalSteps > 0 ? ((currentStep + 0.5) / totalSteps) * 100 : 0}%` }}
            className="absolute left-0 top-0 h-1.5 bg-blue-500/20 rounded-full pointer-events-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 border-l border-border pl-6 ml-auto">
        <button 
          onClick={() => (window as any).saveToLocal?.()}
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-all" 
          title="Save to Browser"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
