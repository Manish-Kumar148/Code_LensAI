# 🔍 CodeLens AI

<div align="center">
  <img src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" width="1200" alt="CodeLens AI Banner" />
  <p align="center">
    <strong>An AI-powered, step-by-step code execution tracer and visualizer.</strong>
  </p>
  <p align="center">
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind" />
    <img src="https://img.shields.io/badge/OpenAI-SDK-412991?style=for-the-badge&logo=openai" alt="OpenAI" />
  </p>
</div>

---

## 🌟 Overview

CodeLens AI transforms static code into a dynamic, interactive experience. By leveraging advanced LLMs (GPT-4o), it traces the execution of your code line-by-line, providing a deep look into the variable states, call stacks, and heap memory allocations.

Whether you are debugging a complex recursive function or learning how pointers work, CodeLens AI provides the clarity you need.

## 🚀 Key Features

- **🧠 Intelligent Tracing**: Powered by OpenAI to provide accurate, step-by-step program state analysis.
- **⚡ Real-time Visualization**: Watch your variables change and your stack grow as you step through the execution.
- **📝 Monaco Editor**: A professional-grade coding experience with syntax highlighting and line indicators.
- **🔒 Bring Your Own Key**: Enter your OpenAI API key directly in the UI for immediate access.
- **💾 Local Persistence**: Your code and API settings are saved automatically in your browser.
- **🎨 Modern Dark UI**: A sleek, high-performance interface built with Tailwind CSS v4 and Framer Motion.

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/), [Vite](https://vitejs.dev/), [Tailwind CSS v4](https://tailwindcss.com/)
- **Editor**: [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- **Backend**: [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/)
- **AI**: [OpenAI SDK](https://github.com/openai/openai-node) (GPT-4o-mini)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 🏁 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Manish-Kumar148/Code_LensAI.git
   cd Code_LensAI
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment:**
   Create a `.env` file in the root directory:
   ```env
   OPENAI_API_KEY="your_api_key_here"
   APP_URL="http://localhost:3000"
   ```
   *(Note: You can also enter the API key directly in the application UI)*

### Running Locally

```bash
npm run dev
```

The application will be available at **http://localhost:3000**.

## 📖 Usage Guide

1. **Input Code**: Write or paste your Python/JavaScript code into the editor.
2. **Add API Key**: In the top header, enter your OpenAI API key in the secure input box.
3. **Run Trace**: Click the **"Run Trace"** button in the bottom panel.
4. **Step Through**: Use the **"Next Step"** button or the scrubber to navigate the execution history.
5. **Inspect**: Watch the **Variables**, **Stack**, and **Heap** panels update in real-time.

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">Built with ❤️ for the developer community.</p>
