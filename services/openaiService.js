const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

async function parseMeetingRequest(text) {
  const systemPrompt = `You are a parser that converts a user's plain-language meeting request into a JSON object with these fields: title (string), time (ISO datetime if possible or human description), attendees (array of emails or names), approvalRequired (true/false), requesterEmail (if available). Output ONLY valid JSON.`;

  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: text }
  ];

  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

  const resp = await openai.createChatCompletion({
    model,
    messages,
    max_tokens: 500,
    temperature: 0
  });

  const content = resp.data.choices?.[0]?.message?.content;
  if (!content) throw new Error('No response from OpenAI');

  try {
    return JSON.parse(content);
  } catch (err) {
    // try to extract JSON substring
    const match = content.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error('Failed to parse OpenAI response as JSON: ' + err.message);
  }
}

module.exports = { parseMeetingRequest };
