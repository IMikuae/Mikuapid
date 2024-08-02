const express = require('express');
const fetch = require('node-fetch');
const app = express();
const settings = require('../settings');

app.use(express.json());

app.get('/api/image', (req, res) => {
  res.json({ imageUrl: settings.imageUrl });
});

app.post('/api/image', (req, res) => {
  const { imageUrl } = req.body;
  if (imageUrl) {
    settings.imageUrl = imageUrl;
    res.json({ message: 'Image URL updated successfully!' });
  } else {
    res.status(400).json({ message: 'Image URL is required!' });
  }
});

app.get('/api/scrape', async (req, res) => {
  try {
    const response = await fetch('https://example.com');
    const html = await response.text();
    // Proses scraping data di sini
    const data = processScrapedData(html);
    res.json({ data });
  } catch (error) {
    console.error('Error in scraping:', error.message);
    res.status(500).json({ message: 'Error in scraping' });
  }
});

function processScrapedData(html) {
  // Tambahkan logika untuk memproses data hasil scraping di sini
  return html;
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
