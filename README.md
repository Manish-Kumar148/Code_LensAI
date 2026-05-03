# CodeLens AI 🚀

CodeLens AI is a full-stack, AI-powered code execution visualizer designed to help developers and students understand how their code runs step-by-step. It tracks variable states, memory usage (stack and heap), and provides AI-generated explanations for every execution step.

![CodeLens AI Preview](https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=1000)

## ✨ Features

- **Interactive Monaco Editor**: A VS Code-like editing experience with syntax highlighting for Python.
- **Step-by-Step Tracing**: Execute code line-by-line and see the immediate impact on state.
- **Variable Monitoring**: Watch variables change in real-time with smooth animations.
- **Memory Visualization**: 
  - **Stack Frames**: Visual representation of the function call stack.
  - **Heap Objects**: Tracking of complex objects and their structures.
- **AI-Powered Logic Explanations**: Uses Gemini 2.0 Flash to explain exactly what is happening at each line of code.
- **Timeline Control**: Jump to any point in the execution history using the slider.
- **Terminal Output**: Real-time console output capture.
- **Snippet Library**: Quickly load common algorithm examples (Factorial, Fibonacci, Linked Lists).

## 🛠️ Tech Stack

- **Frontend**: React 19, Tailwind CSS, Monaco Editor (@monaco-editor/react), Motion (for animations).
- **Backend**: Node.js, Express (Full-stack architecture).
- **AI**: Google Gemini API (Gemini 2.0 Flash).
- **Icons**: Lucide React.

## 🚀 Getting Started

### Prerequisites

- Node.js installed.
- A Gemini API Key from [Google AI Studio](https://aistudio.google.com/).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Manish-Kumar148/CodeLensAi.git
   cd CodeLensAi
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 📖 Usage

1. Write or paste your Python code into the editor on the left.
2. Click **Run Trace** to let the AI analyze the execution path.
3. Use the **Next Step** button or the **Timeline Slider** to move through the execution.
4. Observe the variable changes and memory updates on the right panel.
5. Read the AI explanation at the bottom right to understand the underlying logic.

## 📄 License

This project is licensed under the Apache-2.0 License.
