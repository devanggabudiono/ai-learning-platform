import { spawn } from "child_process";

export async function POST(req: Request) {
    try {
        const { question } = await req.json();

        const ollama = spawn("ollama", ["run", "qwen2.5:7b"]);

        let output = "";
        let errorOutput = "";

        ollama.stdout.on("data", (data) => {
            output += data.toString();
        });

        ollama.stderr.on("data", (data) => {
            errorOutput += data.toString();
        });

        // Kirim prompt ke Ollama
        ollama.stdin.write(question + "\n");
        ollama.stdin.end();

        // Tunggu sampai proses selesai
        await new Promise((resolve, reject) => {
            ollama.on("close", (code) => {
                if (code !== 0) return reject(errorOutput || `Exit code ${code}`);
                resolve(null);
            });
        });

        return Response.json({ answer: output.trim() });
    } catch (error) {
        console.error("OLLAMA ERROR:", error);
        return Response.json({ answer: "AI server error" }, { status: 500 });
    }
}