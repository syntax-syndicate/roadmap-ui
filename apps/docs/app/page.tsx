import { GanttExample } from './components/gantt';

export default function HomePage() {
  return (
    <main className="flex h-screen flex-col justify-center text-center">
      <div className="container mx-auto">
        <h1 className="mb-4 text-2xl font-bold">roadmap-ui</h1>
        <p className="text-fd-muted-foreground">
          Composable React components for building user-facing roadmaps.
        </p>
        <div className="mt-8 flex flex-col overflow-clip h-[500px] w-full bg-white rounded-xl border">
          <GanttExample />
        </div>
      </div>
    </main>
  );
}
