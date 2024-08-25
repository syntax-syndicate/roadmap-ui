import type { FC, ReactNode } from 'react';

type FeatureListGroupProps = {
  children: ReactNode;
};

export const FeatureListGroup: FC<FeatureListGroupProps> = ({ children }) => (
  <div
    className="divide-y divide-transparent"
    style={{ paddingTop: 'var(--gantt-row-height)' }}
  >
    {children}
  </div>
);
