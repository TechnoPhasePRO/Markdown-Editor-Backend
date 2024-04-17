const express = require('express');
const marked = require('marked');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.post('/api/convert', (req, res) => {
  const { markdown } = req.body;
  if (!markdown) {
    return res.json({ html: '' });
  }

  try {
    const html = marked.parse(markdown); 
    res.json({ html });
  } catch (error) {
    console.error('Error converting Markdown to HTML:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
