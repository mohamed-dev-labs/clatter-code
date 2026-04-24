import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export class AIProvider {
  constructor(provider = 'openai', model = 'gpt-4') {
    this.provider = process.env.AI_PROVIDER || provider;
    this.model = process.env.AI_MODEL || model;
    this.apiKey = process.env.AI_API_KEY;
    this.ollamaEndpoint = process.env.OLLAMA_ENDPOINT || 'http://localhost:11434/api/generate';
    this.lmStudioEndpoint = process.env.LM_STUDIO_ENDPOINT || 'http://localhost:1234/v1/chat/completions';
  }

  async chat(prompt) {
    if (this.provider === 'ollama') {
      return this.callOllama(prompt);
    }
    
    if (this.provider === 'lm-studio') {
      return this.callLMStudio(prompt);
    }

    if (!this.apiKey) {
      throw new Error('AI_API_KEY not found in environment variables.');
    }

    // Placeholder for Gana6 integration (OpenAI/Anthropic/Google)
    console.log(`Calling ${this.provider} (${this.model}) with prompt: ${prompt}`);
    return `Response from ${this.provider} for: ${prompt}`;
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
      throw new Error(`Ollama Error: ${error.message}. Make sure Ollama is running.`);
    }
  }

  async callLMStudio(prompt) {
    try {
      const response = await axios.post(this.lmStudioEndpoint, {
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: -1,
        stream: false
      });
      return response.data.choices[0].message.content;
    } catch (error) {
      throw new Error(`LM Studio Error: ${error.message}. Make sure LM Studio Local Server is running on port 1234.`);
    }
  }
}
