const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Proxy endpoint
app.post('/validate-mlbb', async (req, res) => {
  try {
    const response = await axios.post('https://order-sg.codashop.com/validate', req.body, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json"
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error("Proxy Error:", error);
    res.status(500).json({ 
      error: "Failed to fetch username",
      details: error.message 
    });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Proxy running on port ${PORT}`));
