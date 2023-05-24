const express = require('express');
const bodyParser = require( 'body-parser');
const { Configuration, OpenAIApi } = require( 'openai');
const dotenv = require( 'dotenv');

const app = express();
app.use(bodyParser.json());
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

try {
  app.post('/chat', async (req, res) => {
    const prompt = req.body.prompt;
    const response = await generateChatResponse(prompt);
    res.status(200).json({ response });
  });
} catch (error) {
  console.log(error)
}


async function generateChatResponse(prompt) {
  const messages = [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: prompt },
  ];

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages,
    max_tokens: 15,
  });

  return response.data.choices[0].message;
}


app.listen(process.env.PORT, () => {
  console.log('Server is listening on port ' + process.env.PORT);
});
