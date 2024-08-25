import type { FC, ReactNode } from 'react';

type SidebarGroupProperties = {
  children: ReactNode;
  name: string;
};

export const SidebarGroup: FC<SidebarGroupProperties> = ({
  children,
  name,
}) => (
  <div>
    <p
      style={{ height: 'var(--gantt-row-height)' }}
      className="w-full text-left truncate p-2.5 font-medium text-muted-foreground text-xs"
    >
      {name}
    </p>
    <div className="divide-y divide-border/50">{children}</div>
  </div>
);
