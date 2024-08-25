'use client';

import { cn } from '@repo/shadcn-ui/lib/utils';
import { getDaysInMonth } from 'date-fns';
import groupBy from 'lodash.groupby';
import throttle from 'lodash.throttle';
import {
  type CSSProperties,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { type FC, useRef } from 'react';
import { GanttContext } from '../contexts/gantt-context';
import { createInitialTimelineData } from '../lib/data';
import type { Feature, Grouping, Range, TimelineData } from '../types/types';

export type ProviderProperties = {
  features: Feature[];
  range?: Range;
  zoom?: number;
  grouping?: Grouping;
  onSelectItem?: (id: string) => void;
  onAddItem?: (date: Date) => void;
  onMoveItem?: (id: string, startDate: Date, endDate: Date | null) => void;
  onAddMarker?: (date: Date) => void;
  onCopyItemLink?: (id: string) => void;
  onRemoveItem?: (id: string) => void;
  onRemoveMarker?: (id: string) => void;
  editable?: boolean;
  children: ReactNode;
  className?: string;
};

export const Provider: FC<ProviderProperties> = ({
  onSelectItem,
  features,
  zoom = 100,
  range = 'monthly',
  grouping = 'feature',
  onAddItem,
  onMoveItem,
  onAddMarker,
  onCopyItemLink,
  onRemoveItem,
  onRemoveMarker,
  editable = false,
  children,
  className,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [timelineData, setTimelineData] = useState<TimelineData>(
    createInitialTimelineData(new Date())
  );

  const groups = useMemo(() => {
    let groupedFeatures: Record<string, Feature[]> = { features };

    if (grouping !== 'feature') {
      groupedFeatures = groupBy(features, (feature) => feature[grouping]?.name);
    }

    return Object.fromEntries(
      Object.entries(groupedFeatures).sort(([nameA], [nameB]) =>
        nameA.localeCompare(nameB)
      )
    );
  }, [features, grouping]);

  const headerHeight = 60;
  const sidebarWidth = 300;
  const rowHeight = 36;
  let columnWidth = 50;

  if (range === 'monthly') {
    columnWidth = 150;
  } else if (range === 'quarterly') {
    columnWidth = 100;
  }

  const cssVariables = {
    '--gantt-zoom': `${zoom}`,
    '--gantt-column-width': `${(zoom / 100) * columnWidth}px`,
    '--gantt-header-height': `${headerHeight}px`,
    '--gantt-row-height': `${rowHeight}px`,
    '--gantt-sidebar-width': `${sidebarWidth}px`,
  } as CSSProperties;

  // biome-ignore lint/correctness/useExhaustiveDependencies: Re-render when props change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft =
        scrollRef.current.scrollWidth / 2 - scrollRef.current.clientWidth / 2;
    }
  }, [range, zoom]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: "Throttled"
  const handleScroll = useCallback(
    throttle(() => {
      if (!scrollRef.current) {
        return;
      }

      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

      if (scrollLeft === 0) {
        // Extend timelineData to the past
        const firstYear = timelineData[0].year - 1;

        const newTimelineData: TimelineData = [...timelineData];
        newTimelineData.unshift({
          year: firstYear,
          quarters: new Array(4).fill(null).map((_, quarterIndex) => ({
            months: new Array(3).fill(null).map((_, monthIndex) => {
              const month = quarterIndex * 3 + monthIndex;
              return {
                days: getDaysInMonth(new Date(firstYear, month, 1)),
              };
            }),
          })),
        });

        setTimelineData(newTimelineData);

        // Scroll a bit forward so it's not at the very start
        scrollRef.current.scrollLeft = scrollRef.current.clientWidth;
      } else if (scrollLeft + clientWidth >= scrollWidth) {
        // Extend timelineData to the future
        const lastYear = timelineData[timelineData.length - 1].year + 1;

        const newTimelineData: TimelineData = [...timelineData];
        newTimelineData.push({
          year: lastYear,
          quarters: new Array(4).fill(null).map((_, quarterIndex) => ({
            months: new Array(3).fill(null).map((_, monthIndex) => {
              const month = quarterIndex * 3 + monthIndex;
              return {
                days: getDaysInMonth(new Date(lastYear, month, 1)),
              };
            }),
          })),
        });

        setTimelineData(newTimelineData);

        // Scroll a bit back so it's not at the very end
        scrollRef.current.scrollLeft =
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
      }
    }, 100),
    [timelineData]
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);

  return (
    <GanttContext.Provider
      value={{
        zoom,
        range,
        grouping,
        headerHeight,
        columnWidth,
        rowHeight,
        onSelectItem,
        onAddItem,
        onMoveItem,
        onAddMarker,
        groups,
        timelineData,
        placeholderLength: 2,
        onCopyItemLink,
        onRemoveItem,
        onRemoveMarker,
        editable,
        ref: contentRef,
      }}
    >
      <div
        className={cn(
          'gantt relative grid h-full w-full flex-none select-none overflow-auto rounded-sm bg-secondary',
          range,
          className
        )}
        style={{
          ...cssVariables,
          gridTemplateColumns: 'var(--gantt-sidebar-width) 1fr',
        }}
        ref={scrollRef}
      >
        {children}
      </div>
    </GanttContext.Provider>
  );
};
