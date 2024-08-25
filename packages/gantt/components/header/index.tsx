import { type FC, useContext } from 'react';
import { GanttContext } from '../../contexts/gantt-context';
import type { Range } from '../../types/types';
import { DailyHeader } from './daily';
import { MonthlyHeader } from './monthly';
import { QuarterlyHeader } from './quarterly';

const headers: Record<Range, FC> = {
  daily: DailyHeader,
  monthly: MonthlyHeader,
  quarterly: QuarterlyHeader,
};

export const Header: FC = () => {
  const gantt = useContext(GanttContext);
  const Header = headers[gantt.range];

  return (
    <div className="-space-x-px flex h-full w-max divide-x divide-border/50">
      <Header />
    </div>
  );
};
