export default async function handler(req, res) {
  const prompt = req.query.prompt || "";

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>LLaMA Output</title>
      </head>
      <body>
        <h2>Prompt: ${prompt}</h2>
        <pre id="output">Loading model...</pre>
        <script type="module">
          import * as webllm from "https://esm.sh/@mlc-ai/web-llm";
          const engine = new webllm.MLCEngine();
          await engine.reload("Llama-2-7b-chat-hf-q4f16_1");
          const reply = await engine.chat.completions.create({
            messages: [{ role: "user", content: ${JSON.stringify(prompt)} }],
          });
          document.getElementById("output").textContent = reply.choices[0].message.content;
        </script>
      </body>
    </html>`;

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
}