import Link from 'next/link';
import { GanttExample } from './components/gantt';

export default function HomePage() {
  return (
    <main className="flex h-screen flex-col justify-center text-center">
      <h1 className="mb-4 text-2xl font-bold">Hello World</h1>
      <p className="text-fd-muted-foreground">
        You can open{' '}
        <Link
          href="/docs"
          className="text-fd-foreground font-semibold underline"
        >
          /docs
        </Link>{' '}
        and see the documentation.
      </p>
      <div className="container mx-auto">
        <div className="flex h-[800px]">
          <GanttExample />
        </div>
      </div>
    </main>
  );
}
