import { addDays, formatDistance, isSameDay } from 'date-fns';
import {
  type FC,
  type KeyboardEventHandler,
  type MouseEventHandler,
  useContext,
} from 'react';
import { GanttContext } from '../contexts/gantt-context';
import type { Feature } from '../types/types';

type GanttSidebarProperties = {
  feature: Feature;
};

export const GanttSidebarItem: FC<GanttSidebarProperties> = ({ feature }) => {
  const gantt = useContext(GanttContext);
  const tempEndAt =
    feature.endAt && isSameDay(feature.startAt, feature.endAt)
      ? addDays(feature.endAt, 1)
      : feature.endAt;
  const duration = tempEndAt
    ? formatDistance(feature.startAt, tempEndAt)
    : `${formatDistance(feature.startAt, new Date())} so far`;

  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.target === event.currentTarget) {
      gantt.onSelectItem?.(feature.id);
    }
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === 'Enter') {
      gantt.onSelectItem?.(feature.id);
    }
  };

  return (
    // biome-ignore lint/nursery/useSemanticElements: <explanation>
    <div
      role="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      key={feature.id}
      className="relative flex items-center gap-2.5 p-2.5 text-xs"
      style={{
        height: 'var(--gantt-row-height)',
      }}
    >
      {/* <Checkbox onCheckedChange={handleCheck} className="shrink-0" /> */}
      <div
        className="pointer-events-none h-2 w-2 shrink-0 rounded-full"
        style={{
          backgroundColor: feature.status.color,
        }}
      />
      <p className="pointer-events-none flex-1 truncate font-medium">
        {feature.name}
      </p>
      <p className="pointer-events-none text-muted-foreground">{duration}</p>
    </div>
  );
};
