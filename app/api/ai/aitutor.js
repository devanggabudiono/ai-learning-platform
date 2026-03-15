import express from "express";
import { spawn } from "child_process";

const app = express();
app.use(express.json());

app.post("/ai", async (req, res) => {
    try {
        const { question, context } = req.body;

        // Gabungkan context ke system prompt
        const systemPrompt = `You are an expert physics tutor. Context: ${context}. Jawab pertanyaan user secara jelas dan ringkas.`;

        const ollama = spawn("ollama", ["run", "qwen2.5:7b"]);

        let output = "";
        let errorOutput = "";

        ollama.stdout.on("data", (data) => { output += data.toString(); });
        ollama.stderr.on("data", (data) => { errorOutput += data.toString(); });

        // Kirim prompt ke Ollama
        ollama.stdin.write(systemPrompt + "\n" + question + "\n");
        ollama.stdin.end();

        await new Promise((resolve, reject) => {
            ollama.on("close", (code) => {
                if (code !== 0) return reject(errorOutput || `Exit code ${code}`);
                resolve(null);
            });
        });

        res.json({ answer: output.trim() });
    } catch (err) {
        console.error("OLLAMA ERROR:", err);
        res.status(500).json({ answer: "AI server error" });
    }
});

app.listen(3000, () => console.log("AI backend running on port 3000"));