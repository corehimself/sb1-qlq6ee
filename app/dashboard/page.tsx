"use client"

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type Video = {
  id: string;
  playerIdentifier: string;
  videoLink: string;
  status: 'pending' | 'approved' | 'rejected';
  views: number;
  currency: number;
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [videos, setVideos] = useState<Video[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (status === 'authenticated') {
      fetchVideos();
    }
  }, [status]);

  const fetchVideos = async () => {
    const response = await fetch('/api/videos');
    const data = await response.json();
    setVideos(data);
  };

  const handleAction = async (videoId: string, action: 'approve' | 'reject') => {
    await fetch(`/api/videos/${videoId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action }),
    });
    fetchVideos();
  };

  const filteredVideos = videos.filter(video =>
    video.playerIdentifier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return <div>Access Denied. Please log in.</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Video Submissions</CardTitle>
          <CardDescription>Manage and review submitted videos</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            placeholder="Search by player identifier"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Player</TableHead>
                <TableHead>Video Link</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVideos.map((video) => (
                <TableRow key={video.id}>
                  <TableCell>{video.playerIdentifier}</TableCell>
                  <TableCell>
                    <a href={video.videoLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      {video.videoLink}
                    </a>
                  </TableCell>
                  <TableCell>{video.status}</TableCell>
                  <TableCell>{video.views}</TableCell>
                  <TableCell>{video.currency}</TableCell>
                  <TableCell>
                    {video.status === 'pending' && (
                      <>
                        <Button onClick={() => handleAction(video.id, 'approve')} className="mr-2">Approve</Button>
                        <Button onClick={() => handleAction(video.id, 'reject')} variant="destructive">Reject</Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Action History</CardTitle>
          <CardDescription>Recent actions taken on videos</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Add action history log here */}
          <p>Action history log will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}