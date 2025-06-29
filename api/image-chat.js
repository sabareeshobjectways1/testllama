// File: api/image-chat.js
export default async function handler(req, res) {
  const OPENROUTER_API_KEY = "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";

  const { prompt, image } = req.query;

  if (!prompt) {
    return res.status(400).json({ error: "Missing prompt query." });
  }

  const content = [
    {
      type: "text",
      text: prompt
    }
  ];

  if (image) {
    content.push({
      type: "image_url",
      image_url: {
        url: image
      }
    });
  }

  const payload = {
    model: "mistralai/mistral-small-3.2-24b-instruct:free",
    messages: [
      {
        role: "user",
        content
      }
    ]
  };

  try {
    const openrouterRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    const data = await openrouterRes.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message || "OpenRouter API Error" });
    }

    res.status(200).json({ response: data.choices?.[0]?.message?.content || "No response." });

  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
}