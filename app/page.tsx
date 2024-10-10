import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-2rem)]">
      <h1 className="text-4xl font-bold mb-8">Welcome to Roblox Video Dashboard</h1>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/upload">Upload Video</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}