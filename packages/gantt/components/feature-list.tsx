import { cn } from '@repo/shadcn-ui/lib/utils';
import { type FC, type ReactNode, useContext } from 'react';
import { GanttContext } from '../contexts/gantt-context';

type FeatureListProps = {
  className?: string;
  children: ReactNode;
};

export const FeatureList: FC<FeatureListProps> = ({ className, children }) => {
  const gantt = useContext(GanttContext);

  return (
    <div
      className={cn('absolute top-0 left-0 h-full w-max space-y-4', className)}
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
          {children}
        </div>
      ))}
    </div>
  );
};
