import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export class AIProvider {
  constructor(provider = 'openai') {
    this.provider = provider;
    this.apiKey = process.env.AI_API_KEY;
  }

  async chat(message) {
    if (!this.apiKey) {
      throw new Error('AI_API_KEY not found in environment variables.');
    }

    // Placeholder for Gana6 integration (OpenAI/Anthropic/Google)
    console.log(`Calling ${this.provider} with message: ${message}`);
    
    // Simple mock response for now
    return `Response from ${this.provider} for: ${message}`;
  }
}
