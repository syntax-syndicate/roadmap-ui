import Link from 'next/link';
import { Gantt } from '@repo/gantt';

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
      <Gantt
        features={[]}
        markers={[]}
        editable
        grouping="feature"
        onAddItem={console.log}
        onAddMarker={console.log}
        onCopyItemLink={console.log}
        onMoveItem={console.log}
        onRemoveItem={console.log}
        onRemoveMarker={console.log}
        onSelectItem={console.log}
        range="monthly"
        zoom={100}
      />
    </main>
  );
}
