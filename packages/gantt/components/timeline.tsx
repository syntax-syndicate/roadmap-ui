import { type FC, useContext } from 'react';
import { GanttContext } from '../contexts/gantt-context';
import type { Range } from '../types/types';
import { FeatureItem } from './feature-item';
import { DailyHeader } from './headers/daily';
import { MonthlyHeader } from './headers/monthly';
import { QuarterlyHeader } from './headers/quarterly';
import { MarkerComponent } from './marker';
import { NewMarkerTrigger } from './new-marker-trigger';
import { Today } from './today';

const headers: Record<Range, FC> = {
  daily: DailyHeader,
  monthly: MonthlyHeader,
  quarterly: QuarterlyHeader,
};

export const GanttTimeline: FC = () => {
  const gantt = useContext(GanttContext);
  const Header = headers[gantt.range];

  return (
    <>
      <div className="-space-x-px flex h-full w-max divide-x divide-border/50">
        <Header />
      </div>
      <div
        className="absolute top-0 left-0 h-full w-max space-y-4"
        style={{ marginTop: 'var(--gantt-header-height)' }}
      >
        {Object.entries(gantt.groups).map(([groupName, features]) => (
          <div
            key={groupName}
            className="divide-y divide-transparent"
            style={{
              paddingTop:
                gantt.grouping === 'feature' ? 0 : 'var(--gantt-row-height)',
            }}
          >
            {features.map((feature) => (
              <div
                className="relative flex w-max min-w-full py-0.5"
                style={{ height: 'var(--gantt-row-height)' }}
                key={feature.id}
              >
                <FeatureItem {...feature} />
              </div>
            ))}
          </div>
        ))}
      </div>
      {gantt.markers.map((marker) => (
        <MarkerComponent key={marker.id} {...marker} />
      ))}
      <Today />
      {gantt.onAddMarker && gantt.editable ? <NewMarkerTrigger /> : null}
    </>
  );
};
