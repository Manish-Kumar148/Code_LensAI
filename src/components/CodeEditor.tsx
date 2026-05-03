import React from "react";
import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  code: string;
  onChange: (value: string | undefined) => void;
  currentLine: number | null;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange, currentLine }) => {
  const handleEditorDidMount = (editor: any, monaco: any) => {
    // We'll use this to set decorations for the current line
  };

  const decorations = React.useMemo(() => {
    if (currentLine === null) return [];
    return [
      {
        range: { startLineNumber: currentLine, startColumn: 1, endLineNumber: currentLine, endColumn: 1 },
        options: {
          isWholeLine: true,
          className: "bg-blue-500/20",
          glyphMarginClassName: "bg-blue-500",
        },
      },
    ];
  }, [currentLine]);

  return (
    <div className="flex-1 h-full border-r border-border overflow-hidden flex flex-col">
      <div className="px-4 py-2 bg-sidebar-bg border-b border-border flex justify-between items-center">
        <span className="text-xs font-medium uppercase tracking-wider text-slate-400">main.py</span>
      </div>
      <Editor
        height="100%"
        defaultLanguage="python"
        theme="vs-dark"
        value={code}
        onChange={onChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'JetBrains Mono', monospace",
          lineNumbers: "on",
          roundedSelection: false,
          scrollBeyondLastLine: false,
          readOnly: false,
          automaticLayout: true,
          padding: { top: 10 },
        }}
      />
    </div>
  );
};
