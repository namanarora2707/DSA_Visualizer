// Small helper that attempts to ask OpenRouter for a call sequence for a function.
// This is optional — if VITE_OPENROUTER_API_KEY is not set this will quickly return null.

export async function getCallSequenceFromCode(functionCode, maxDepth = 8) {
  const key = import.meta.env.VITE_OPENROUTER_API_KEY;
  if (!key) return null; // fallback: not configured

  try {
    const prompt = `Given the following JavaScript function, return a simple depth-first list of recursive calls (just the function name and parameters) up to ${maxDepth} steps as a JSON array. Do not include any other text. Example output:\n[\n  { \"function\": \"f\", \"params\": { \"n\": 3 } },\n  ...\n]\n\nFunction:\n${functionCode}`;

    const resp = await fetch("https://api.openrouter.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful assistant that outputs valid JSON only." },
          { role: "user", content: prompt }
        ],
        max_tokens: 400,
        temperature: 0
      })
    });

    const data = await resp.json();
    // Response structure could vary — try safe extraction
    const txt = (data?.choices?.[0]?.message?.content) || (data?.choices?.[0]?.text) || null;
    if (!txt) return null;
    // Try to parse JSON from content
    const jsonStart = txt.indexOf("[");
    const jsonEnd = txt.lastIndexOf("]") + 1;
    if (jsonStart >= 0 && jsonEnd > jsonStart) {
      const jsonText = txt.slice(jsonStart, jsonEnd);
      return JSON.parse(jsonText);
    }
    return null;
  } catch (err) {
    console.warn("OpenRouter call failed:", err);
    return null;
  }
}
