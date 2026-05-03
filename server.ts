import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY || "");
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  // API Route to trace code
  app.post("/api/trace", async (req, res) => {
    const { code, language } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Code is required" });
    }

    try {
      const prompt = `
        You are a highly accurate code execution tracer.
        Input Code (${language || 'python'}):
        \`\`\`
        ${code}
        \`\`\`

        Task: Trace the execution of this code step-by-step.
        For each step, provide:
        1. Line number (1-indexed).
        2. Variable states (name-value map).
        3. Stack frame (list of active function calls).
        4. Heap objects (if any complex objects like lists/dicts are created).
        5. A short explanation of what is happening at this step.
        6. Output (if something is printed).

        Output the result ONLY as a JSON array of objects with this schema:
        [
          {
            "line": number,
            "variables": { [key: string]: any },
            "stack": string[],
            "heap": { [key: string]: any },
            "explanation": string,
            "output": string | null
          }
        ]
        
        Ensure you handle loops, conditions, and function calls correctly.
        If there's a syntax error, return an object with an "error" field instead.
      `;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      
      // Clean up markdown code blocks if present
      const jsonStr = text.replace(/```json|```/g, "").trim();
      const trace = JSON.parse(jsonStr);

      res.json({ trace });
    } catch (error: any) {
      console.error("Tracing error:", error);
      res.status(500).json({ error: "Failed to trace code execution", details: error.message });
    }
  });

  const server = app.listen(PORT, "0.0.0.0", async () => {
    console.log(`Server running on http://localhost:${PORT}`);
    
    // Vite middleware for development
    if (process.env.NODE_ENV !== "production") {
      console.log("Initializing Vite in middleware mode...");
      try {
        const vite = await createViteServer({
          server: { middlewareMode: true },
          appType: "spa",
        });
        app.use(vite.middlewares);
        console.log("Vite middleware loaded.");
      } catch (err) {
        console.error("Vite failed to start:", err);
      }
    } else {
      const distPath = path.join(process.cwd(), "dist");
      app.use(express.static(distPath));
      app.get("*", (req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
      });
    }
  });

  server.on('error', (err) => {
    console.error('Server error:', err);
  });
}

startServer().catch(err => {
  console.error("Failed to start server:", err);
});
