import React from "react";
import { motion } from "motion/react";
import { Boxes, Layers } from "lucide-react";

interface StackHeapVisualizerProps {
  stack: string[];
  heap: Record<string, any>;
}

export const StackHeapVisualizer: React.FC<StackHeapVisualizerProps> = ({ stack, heap }) => {
  return (
    <div className="flex-1 min-h-0 flex flex-col border-b border-border">
      <div className="px-4 py-2 bg-sidebar-bg border-b border-border flex items-center gap-2">
        <Layers className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Memory</span>
      </div>
      <div className="flex-1 overflow-y-auto p-4 flex gap-6">
        {/* Stack Visualizer */}
        <div className="flex-1 space-y-2">
          <h4 className="text-[10px] uppercase tracking-tighter text-slate-500 mb-2 flex items-center gap-1">
            <Layers className="w-3 h-3" /> Stack Frames
          </h4>
          <div className="flex flex-col-reverse gap-1.5">
            {stack.length === 0 ? (
              <div className="h-10 border border-dashed border-slate-700/50 rounded flex items-center justify-center text-[10px] text-slate-600">
                Empty Stack
              </div>
            ) : (
              stack.map((frame, i) => (
                <motion.div
                  key={`${frame}-${i}`}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="px-3 py-2 bg-blue-500/10 border border-blue-500/30 rounded text-xs font-mono text-blue-300 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  {frame}
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Heap Visualizer */}
        <div className="flex-1 space-y-2 border-l border-border pl-4">
          <h4 className="text-[10px] uppercase tracking-tighter text-slate-500 mb-2 flex items-center gap-1">
            <Boxes className="w-3 h-3" /> Heap Objects
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {Object.keys(heap).length === 0 ? (
              <div className="h-10 border border-dashed border-slate-700/50 rounded flex items-center justify-center text-[10px] text-slate-600">
                Empty Heap
              </div>
            ) : (
              Object.entries(heap).map(([id, data]) => (
                <motion.div
                  key={id}
                  layoutId={id}
                  className="p-2 bg-purple-500/10 border border-purple-500/30 rounded text-[11px] font-mono"
                >
                  <div className="text-purple-400 mb-1 border-b border-purple-500/20 pb-0.5">Object #{id}</div>
                  <div className="text-slate-300 truncate">{JSON.stringify(data)}</div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
