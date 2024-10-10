import { NextApiRequest, NextApiResponse } from 'next';

// Mock data for demonstration
const mockVideos = [
  { id: '1', playerIdentifier: 'player1', videoLink: 'https://youtube.com/watch?v=123', status: 'pending', views: 1000, currency: 100 },
  { id: '2', playerIdentifier: 'player2', videoLink: 'https://tiktok.com/@user/video/456', status: 'approved', views: 5000, currency: 500 },
  // Add more mock data as needed
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // In a real application, you would fetch this data from your database
    res.status(200).json(mockVideos);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}