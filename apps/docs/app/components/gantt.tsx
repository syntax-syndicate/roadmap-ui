'use client';

import * as Gantt from '@repo/gantt';
import type { FC } from 'react';
import { exampleFeatures, exampleMarkers } from '../lib/content';

export const GanttExample: FC = () => (
  <Gantt.Provider
    features={exampleFeatures}
    editable
    grouping="feature"
    onAddItem={console.log}
    onAddMarker={console.log}
    onCopyItemLink={console.log}
    onMoveItem={console.log}
    onRemoveItem={console.log}
    onSelectItem={console.log}
    range="monthly"
    zoom={100}
  >
    <Gantt.Sidebar />
    <Gantt.Header />
    <Gantt.FeatureList />
    {exampleMarkers.map((marker) => (
      <Gantt.Marker key={marker.id} {...marker} onRemove={console.log} />
    ))}
    <Gantt.Today />
    <Gantt.CreateMarkerTrigger />
  </Gantt.Provider>
);
