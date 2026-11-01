import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { askResumeRag } from './backend/nemotron_rag';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// API route for Resume RAG
app.post('/api/chat', async (req, res) => {
  try {
    const { query, apiKey } = req.body || {};
    if (!query || typeof query !== 'string' || !query.trim()) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const ragResult = await askResumeRag(query.trim(), apiKey);
    return res.status(200).json({
      success: true,
      data: ragResult
    });
  } catch (error: any) {
    console.error('Server RAG Error:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Internal Server Error'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', llm: 'nvidia/nemotron-3.5-lightning-30b-a3b', embed: 'nvidia/nemotron-3.5-embed-1b' });
});

async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT} in ${isDev ? 'development' : 'production'} mode`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
