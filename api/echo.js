// File: api/echo.js

export default function handler(req, res) {
  // Vercel automatically parses query parameters into req.query
  const { prompt } = req.query;

  if (!prompt) {
    // If 'prompt' parameter is missing, send a 400 Bad Request error
    res.status(400).json({ error: "Query parameter 'prompt' is required." });
    return;
  }

  // "Print" the prompt by sending it back in the JSON response
  // You can also send plain text if you prefer:
  // res.status(200).setHeader('Content-Type', 'text/plain').send(`You sent: ${prompt}`);
  res.status(200).json({
    message: "Prompt received!",
    your_prompt: prompt,
    timestamp: new Date().toISOString()
  });
}