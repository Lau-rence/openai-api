const { Configuration, OpenAIApi } = require('openai');
const dotenv = require('dotenv');
const xlsx = require('xlsx'); //Can read CVS too
const fs = require('fs');

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function generateInsights(req, res) {
  const prompt = "Make a revenue activity insight to this data set ";
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'No file provided' });
  }

  const insights = [];

  const workbook = xlsx.readFile(file.path);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = xlsx.utils.sheet_to_json(worksheet);

  jsonData.forEach((row) => {
    // Process each row of the XLSX file
    const rowData = Object.values(row).join(', ');
    insights.push(rowData);
  });

  fs.unlinkSync(file.path); // Delete the uploaded file

  const combinedPrompt = prompt + "\nFile Content:\n" + insights.join('\n');
  const generatedInsights = await generateInsightsHelper(combinedPrompt);
  res.status(200).json({ insights: generatedInsights });
}

async function generateInsightsHelper(prompt) {
  const messages = [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: prompt },
  ];
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages,
    max_tokens: 1500,
  });

  const generatedText = response.data.choices[0].message;
  return generatedText;
}

module.exports = {
  generateInsights,
};
