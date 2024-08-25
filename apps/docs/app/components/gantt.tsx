'use client';

import * as Gantt from '@repo/gantt';
import type { Feature } from '@repo/gantt/types/types';
import type { FC } from 'react';
import { exampleFeatures, exampleMarkers } from '../lib/content';

export const GanttExample: FC = () => {
  const groupedFeatures: Record<string, Feature[]> = {
    features: exampleFeatures,
  };

  const sortedGroupedFeatures = Object.fromEntries(
    Object.entries(groupedFeatures).sort(([nameA], [nameB]) =>
      nameA.localeCompare(nameB)
    )
  );

  return (
    <Gantt.Provider
      features={exampleFeatures}
      editable
      grouping="feature"
      onAddItem={console.log}
      onCopyItemLink={console.log}
      onMoveItem={console.log}
      onRemoveItem={console.log}
      onSelectItem={console.log}
      range="monthly"
      zoom={100}
    >
      <Gantt.Sidebar />
      <Gantt.Timeline>
        <Gantt.Header />
        <Gantt.FeatureList>
          {Object.entries(sortedGroupedFeatures).map(([group, features]) => (
            <Gantt.FeatureListGroup key={group}>
              {features.map((feature) => (
                <Gantt.FeatureItem key={feature.id} {...feature} />
              ))}
            </Gantt.FeatureListGroup>
          ))}
        </Gantt.FeatureList>
        {exampleMarkers.map((marker) => (
          <Gantt.Marker key={marker.id} {...marker} onRemove={console.log} />
        ))}
        <Gantt.Today />
        <Gantt.CreateMarkerTrigger onCreateMarker={console.log} />
      </Gantt.Timeline>
    </Gantt.Provider>
  );
};
