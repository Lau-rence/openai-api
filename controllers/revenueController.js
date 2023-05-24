const { Configuration, OpenAIApi } = require('openai');
const dotenv = require('dotenv');

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  async function generateChatResponse(req, res) {
    const prompt = req.body.prompt;
    const messages = [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: prompt },
    ];
  
    try {
      const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages,
        max_tokens: 15,
      });
  
      res.status(200).json({ response: response.data.choices[0].message });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }

module.exports = {
    generateChatResponse,
};