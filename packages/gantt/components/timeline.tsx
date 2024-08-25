import { type FC, type ReactNode, useContext } from 'react';
import { GanttContext } from '../contexts/gantt-context';
import type { Range } from '../types/types';
import { FeatureItem } from './feature-item';
import { DailyHeader } from './headers/daily';
import { MonthlyHeader } from './headers/monthly';
import { QuarterlyHeader } from './headers/quarterly';
import { NewMarkerTrigger } from './new-marker-trigger';

const headers: Record<Range, FC> = {
  daily: DailyHeader,
  monthly: MonthlyHeader,
  quarterly: QuarterlyHeader,
};

type TimelineProperties = {
  children: ReactNode;
};

export const Timeline: FC<TimelineProperties> = ({ children }) => {
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
      {gantt.onAddMarker && gantt.editable ? <NewMarkerTrigger /> : null}
      {children}
    </>
  );
};
