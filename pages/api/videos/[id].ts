import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { action } = req.body;

  if (req.method === 'PATCH') {
    // In a real application, you would update the video status in your database
    // and perform any necessary actions (e.g., updating currency)
    res.status(200).json({ message: `Video ${id} ${action}d successfully` });
  } else {
    res.setHeader('Allow', ['PATCH']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}