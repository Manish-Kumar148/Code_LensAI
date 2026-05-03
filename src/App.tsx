import React, { useState, useCallback } from "react";
import axios from "axios";
import { CodeEditor } from "./components/CodeEditor";
import { VariablePanel } from "./components/VariablePanel";
import { StackHeapVisualizer } from "./components/StackHeapVisualizer";
import { AIExplanation } from "./components/AIExplanation";
import { ControlPanel } from "./components/ControlPanel";
import { Terminal, Cpu, Info, Zap } from "lucide-react";

interface TraceStep {
  line: number;
  variables: Record<string, any>;
  stack: string[];
  heap: Record<string, any>;
  explanation: string;
  output: string | null;
}

const DEFAULT_CODE = `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

result = factorial(4)
print(f"Result is {result}")`;

export default function App() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [trace, setTrace] = useState<TraceStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isTracing, setIsTracing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRunTrace = async () => {
    setIsTracing(true);
    setError(null);
    setTrace([]);
    setCurrentStepIndex(-1);
    
    try {
      const response = await axios.post("/api/trace", { code });
      if (response.data.error) {
        setError(response.data.error);
      } else {
        setTrace(response.data.trace);
        setCurrentStepIndex(0);
      }
    } catch (err: any) {
      setError(err.response?.data?.details || "Failed to connect to tracing server");
    } finally {
      setIsTracing(false);
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex < trace.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(-1);
    setTrace([]);
  };

  const jumpToStep = (index: number) => {
    if (index >= 0 && index < trace.length) {
      setCurrentStepIndex(index);
    }
  };

  const saveToLocal = () => {
    localStorage.setItem("codelens_saved_code", code);
    alert("Code saved to local storage!");
  };

  // Expose these factors to window for the control panel (simple bridge)
  React.useEffect(() => {
    (window as any).jumpToStep = jumpToStep;
    (window as any).saveToLocal = saveToLocal;
    
    const saved = localStorage.getItem("codelens_saved_code");
    if (saved && !code) setCode(saved);
  }, [trace, code]);

  const currentStep = trace[currentStepIndex] || null;

  return (
    <div className="flex flex-col h-screen bg-slate-950 overflow-hidden select-none">
      {/* Header */}
      <header className="h-14 border-b border-border bg-sidebar-bg flex items-center px-6 justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
            CodeLens <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px] font-mono border border-blue-500/20">v2.0</span>
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <select 
            className="bg-slate-800 border border-border text-xs text-white px-3 py-1.5 rounded-md outline-none focus:ring-1 focus:ring-blue-500"
            onChange={(e) => setCode(e.target.value)}
            defaultValue={DEFAULT_CODE}
          >
            <option value={DEFAULT_CODE}>Factorial (Recursion)</option>
            <option value={`def fib(n):
    a, b = 0, 1
    for i in range(n):
        yield a
        a, b = b, a + b

nums = list(fib(5))
print(nums)`}>Fibonacci (Iterators)</option>
            <option value={`class Node:
    def __init__(self, val):
        self.val = val
        self.next = None

head = Node(1)
head.next = Node(2)
curr = head
while curr:
    print(curr.val)
    curr = curr.next`}>Linked List (Objects)</option>
          </select>
        
          <div className="flex bg-slate-800/50 rounded-full p-1 border border-border">
            <button className="px-4 py-1 text-xs font-medium text-white bg-blue-600 rounded-full">Visualizer</button>
            <button className="px-4 py-1 text-xs font-medium text-slate-400 hover:text-white transition-colors">Documentation</button>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <main className="flex-1 flex min-h-0 overflow-hidden">
        {/* Left Side: Editor */}
        <div className="w-[55%] flex flex-col min-w-0">
          <CodeEditor 
            code={code} 
            onChange={(val) => setCode(val || "")} 
            currentLine={currentStep?.line || null}
          />
          
          {/* Debug Console / Output */}
          <div className="h-40 border-t border-border bg-black/40 flex flex-col">
            <div className="px-4 py-1.5 bg-sidebar-bg border-b border-border flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[10px] font-medium uppercase tracking-widest text-slate-400">Terminal Output</span>
            </div>
            <div className="flex-1 p-4 font-mono text-sm text-green-400 overflow-y-auto">
              {error ? (
                <div className="text-red-400">Error: {error}</div>
              ) : (
                trace.slice(0, currentStepIndex + 1)
                  .filter(s => s.output)
                  .map((s, i) => <div key={i}>{s.output}</div>)
              )}
              {currentStepIndex === -1 && !isTracing && (
                <div className="text-slate-600 italic">Program output will appear here...</div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Inspection Panels */}
        <div className="flex-1 flex flex-col border-l border-border bg-panel-bg shrink-0 overflow-hidden">
          <VariablePanel variables={currentStep?.variables || {}} />
          <StackHeapVisualizer stack={currentStep?.stack || []} heap={currentStep?.heap || {}} />
          <AIExplanation explanation={currentStep?.explanation || ""} />
        </div>
      </main>

      {/* Bottom Controls */}
      <ControlPanel 
        onRun={handleRunTrace}
        onNext={handleNextStep}
        onReset={handleReset}
        isRunning={trace.length > 0}
        isTracing={isTracing}
        currentStep={currentStepIndex}
        totalSteps={trace.length}
      />
    </div>
  );
}
