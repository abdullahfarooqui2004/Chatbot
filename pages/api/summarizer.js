import { google, createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

const client = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { text } = req.body;

    const result = await generateText({
      model: google("gemini-2.0-flash"),
      prompt: `
Summarize the following text. Provide:
- Short title
- 3–5 bullet point summary
- Action items (if any)

Text:
${text}
      `,
    });

    return res.status(200).json({
      summary: result.text,
    });

  } catch (error) {
    console.error("GEMINI API ERROR:", error);

    return res.status(500).json({
      error: error.message || "Something went wrong",
    });
  }
}