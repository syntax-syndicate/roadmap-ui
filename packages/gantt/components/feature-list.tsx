import { cn } from '@repo/shadcn-ui/lib/utils';
import { type FC, useContext } from 'react';
import { GanttContext } from '../contexts/gantt-context';
import { FeatureItem } from './feature-item';

type FeatureListProps = {
  className?: string;
};

export const FeatureList: FC<FeatureListProps> = ({ className }) => {
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
          {features.map((feature) => (
            <FeatureItem key={feature.id} {...feature} />
          ))}
        </div>
      ))}
    </div>
  );
};
