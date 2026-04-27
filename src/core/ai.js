import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export class AIProvider {
  constructor(provider = 'openai', model = 'gpt-4') {
    this.provider = process.env.AI_PROVIDER || provider;
    this.model = process.env.AI_MODEL || model;
    this.apiKey = process.env.AI_API_KEY;
    this.anthropicKey = process.env.ANTHROPIC_API_KEY;
    this.googleKey = process.env.GOOGLE_API_KEY;
    this.xaiKey = process.env.XAI_API_KEY;
    
    this.ollamaEndpoint = process.env.OLLAMA_ENDPOINT || 'http://localhost:11434/api/generate';
    this.lmStudioEndpoint = process.env.LM_STUDIO_ENDPOINT || 'http://localhost:1234/v1/chat/completions';
  }

  async chat(prompt) {
    switch (this.provider) {
      case 'ollama': return this.callOllama(prompt);
      case 'lm-studio': return this.callLMStudio(prompt);
      case 'anthropic': return this.callAnthropic(prompt);
      case 'google': return this.callGoogle(prompt);
      case 'xai': return this.callXAI(prompt);
      default: return this.callOpenAI(prompt);
    }
  }

  async callOpenAI(prompt) {
    if (!this.apiKey) throw new Error('AI_API_KEY not found.');
    console.log(`[AI] Calling OpenAI (${this.model})...`);
    return `OpenAI Response for: ${prompt}`;
  }

  async callAnthropic(prompt) {
    if (!this.anthropicKey) throw new Error('ANTHROPIC_API_KEY not found.');
    console.log(`[AI] Calling Anthropic...`);
    return `Anthropic Response for: ${prompt}`;
  }

  async callGoogle(prompt) {
    if (!this.googleKey) throw new Error('GOOGLE_API_KEY not found.');
    console.log(`[AI] Calling Google Gemini...`);
    return `Google Response for: ${prompt}`;
  }

  async callXAI(prompt) {
    if (!this.xaiKey) throw new Error('XAI_API_KEY not found.');
    console.log(`[AI] Calling xAI...`);
    return `xAI Response for: ${prompt}`;
  }

  async callOllama(prompt) {
    try {
      const response = await axios.post(this.ollamaEndpoint, {
        model: this.model || 'llama3',
        prompt: prompt,
        stream: false
      });
      return response.data.response;
    } catch (error) {
      throw new Error(`Ollama Error: ${error.message}`);
    }
  }

  async callLMStudio(prompt) {
    try {
      const response = await axios.post(this.lmStudioEndpoint, {
        messages: [{ role: "user", content: prompt }],
        stream: false
      });
      return response.data.choices[0].message.content;
    } catch (error) {
      throw new Error(`LM Studio Error: ${error.message}`);
    }
  }
}
