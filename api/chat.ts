import type { Request, Response } from 'express';
import { askResumeRag } from '../backend/nemotron_rag';

export default async function handler(req: Request, res: Response) {
  // Enable CORS for Vercel deployment
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

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
    console.error('RAG Handler Error:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Failed to process RAG query'
    });
  }
}
