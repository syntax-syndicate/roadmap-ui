import { type FC, useContext } from 'react';
import { GanttContext } from '../contexts/gantt-context';
import { SidebarHeader } from './sidebar-header';
import { GanttSidebarItem } from './sidebar-item';

export const GanttSidebar: FC = () => {
  const gantt = useContext(GanttContext);

  return (
    <div className="sticky left-0 z-30 h-max min-h-full overflow-clip border-border/50 border-r bg-background/90 backdrop-blur-md">
      <SidebarHeader />
      <div className="space-y-4">
        {Object.entries(gantt.groups).map(([group, features]) => (
          <div key={group}>
            {gantt.grouping !== 'feature' && (
              <p
                style={{
                  height: 'var(--gantt-row-height)',
                }}
                className="w-full truncate p-2.5 font-medium text-muted-foreground text-xs"
              >
                {features[0][gantt.grouping]?.name ?? 'None'}
              </p>
            )}
            <div className="divide-y divide-border/50">
              {features.map((feature) => (
                <GanttSidebarItem feature={feature} key={feature.id} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
