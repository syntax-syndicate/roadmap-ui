import { DndContext, MouseSensor, useSensor } from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import { Avatar } from '@repo/shadcn-ui/components/ui/avatar';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@repo/shadcn-ui/components/ui/context-menu';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@repo/shadcn-ui/components/ui/hover-card';
import { Separator } from '@repo/shadcn-ui/components/ui/separator';
import { addDays, getDate, getDaysInMonth, isSameDay } from 'date-fns';
import { EyeIcon, LinkIcon, TrashIcon } from 'lucide-react';
import { type FC, useContext, useRef, useState } from 'react';
import { GanttContext } from '../contexts/gantt-context';
import { useMouseRef } from '../hooks/use-mouse-ref';
import {
  getAddRange,
  getDifferenceIn,
  getInnerDifferenceIn,
  getStartOf,
} from '../lib/range-fns';
import { getDateByMousePosition } from '../lib/utils';
import type { Feature, GanttContextProps } from '../types/types';
import { FeatureDragHelper } from './feature-drag-helper';
import { FeatureItemCard } from './feature-item-card';

const getOffset = (
  date: Date,
  timelineStartDate: Date,
  context: GanttContextProps
) => {
  const parsedColumnWidth = (context.columnWidth * context.zoom) / 100;
  const differenceIn = getDifferenceIn(context.range);
  const startOf = getStartOf(context.range);
  const fullColumns = differenceIn(startOf(date), timelineStartDate);

  if (context.range === 'daily') {
    return parsedColumnWidth * fullColumns;
  }

  const partialColumns = date.getDate();
  const daysInMonth = getDaysInMonth(date);
  const pixelsPerDay = parsedColumnWidth / daysInMonth;

  return fullColumns * parsedColumnWidth + partialColumns * pixelsPerDay;
};

const getWidth = (
  startAt: Date,
  endAt: Date | null,
  context: GanttContextProps
) => {
  const parsedColumnWidth = (context.columnWidth * context.zoom) / 100;

  if (!endAt) {
    return parsedColumnWidth * 2;
  }

  const differenceIn = getDifferenceIn(context.range);

  if (context.range === 'daily') {
    const delta = differenceIn(endAt, startAt);

    return parsedColumnWidth * (delta ? delta : 1);
  }

  const daysInStartMonth = getDaysInMonth(startAt);
  const pixelsPerDayInStartMonth = parsedColumnWidth / daysInStartMonth;

  if (isSameDay(startAt, endAt)) {
    return pixelsPerDayInStartMonth;
  }

  const innerDifferenceIn = getInnerDifferenceIn(context.range);
  const startOf = getStartOf(context.range);

  if (isSameDay(startOf(startAt), startOf(endAt))) {
    return innerDifferenceIn(endAt, startAt) * pixelsPerDayInStartMonth;
  }

  const startRangeOffset = daysInStartMonth - getDate(startAt);
  const endRangeOffset = getDate(endAt);
  const fullRangeOffset = differenceIn(startOf(endAt), startOf(startAt));
  const daysInEndMonth = getDaysInMonth(endAt);
  const pixelsPerDayInEndMonth = parsedColumnWidth / daysInEndMonth;

  return (
    (fullRangeOffset - 1) * parsedColumnWidth +
    startRangeOffset * pixelsPerDayInStartMonth +
    endRangeOffset * pixelsPerDayInEndMonth
  );
};

export const FeatureItem: FC<Feature> = (feature) => {
  const gantt = useContext(GanttContext);
  const timelineStartDate = new Date(gantt.timelineData[0].year, 0, 1);
  const [startAt, setStartAt] = useState(feature.startAt);
  const [endAt, setEndAt] = useState(feature.endAt);
  const width = getWidth(startAt, endAt, gantt);
  const offset = getOffset(startAt, timelineStartDate, gantt);
  const addRange = getAddRange(gantt.range);
  const ref = useRef<HTMLDivElement>(null);
  const mouse = useMouseRef(ref);

  const [previousMouseX, setPreviousMouseX] = useState(0);
  const [previousStartAt, setPreviousStartAt] = useState(startAt);
  const [previousEndAt, setPreviousEndAt] = useState(endAt);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const handleItemDragStart = () => {
    setPreviousMouseX(mouse.x);
    setPreviousStartAt(startAt);
    setPreviousEndAt(endAt);
  };

  const handleItemDragMove = () => {
    const currentDate = getDateByMousePosition(gantt, mouse.x);
    const originalDate = getDateByMousePosition(gantt, previousMouseX);
    const delta =
      gantt.range === 'daily'
        ? getDifferenceIn(gantt.range)(currentDate, originalDate)
        : getInnerDifferenceIn(gantt.range)(currentDate, originalDate);
    const newStartDate = addDays(previousStartAt, delta);
    const newEndDate = previousEndAt ? addDays(previousEndAt, delta) : null;

    setStartAt(newStartDate);
    setEndAt(newEndDate);
  };

  const onDragEnd = () => gantt.onMoveItem?.(feature.id, startAt, endAt);
  const handleLeftDragMove = () =>
    setStartAt(getDateByMousePosition(gantt, mouse.x));
  const handleRightDragMove = () =>
    setEndAt(getDateByMousePosition(gantt, mouse.x));
  const handleClick = () =>
    setTimeout(() => gantt.onSelectItem?.(feature.id), 200);
  const handleCopyLink = () => gantt.onCopyItemLink?.(feature.id);
  const handleRemove = () => gantt.onRemoveItem?.(feature.id);

  return (
    <div
      className="relative flex w-max min-w-full py-0.5"
      style={{ height: 'var(--gantt-row-height)' }}
    >
      <HoverCard>
        <HoverCardTrigger asChild>
          <div ref={ref}>
            <ContextMenu>
              <ContextMenuTrigger asChild>
                <button
                  type="button"
                  className="pointer-events-auto absolute top-0.5"
                  style={{
                    height: 'calc(var(--gantt-row-height) - 4px)',
                    width: Math.round(width),
                    left: Math.round(offset),
                  }}
                  onClick={handleClick}
                >
                  {gantt.editable && (
                    <DndContext
                      sensors={[mouseSensor]}
                      modifiers={[restrictToHorizontalAxis]}
                      onDragMove={handleLeftDragMove}
                      onDragEnd={onDragEnd}
                    >
                      <FeatureDragHelper
                        direction="left"
                        featureId={feature.id}
                        date={startAt}
                      />
                    </DndContext>
                  )}
                  <DndContext
                    sensors={[mouseSensor]}
                    modifiers={[restrictToHorizontalAxis]}
                    onDragStart={handleItemDragStart}
                    onDragMove={handleItemDragMove}
                    onDragEnd={onDragEnd}
                  >
                    <FeatureItemCard
                      id={feature.id}
                      owner={feature.owner}
                      name={feature.name}
                    />
                  </DndContext>
                  {gantt.editable && (
                    <DndContext
                      sensors={[mouseSensor]}
                      modifiers={[restrictToHorizontalAxis]}
                      onDragMove={handleRightDragMove}
                      onDragEnd={onDragEnd}
                    >
                      <FeatureDragHelper
                        direction="right"
                        featureId={feature.id}
                        date={endAt ?? addRange(startAt, 2)}
                      />
                    </DndContext>
                  )}
                </button>
              </ContextMenuTrigger>
              <ContextMenuContent>
                {gantt.onSelectItem ? (
                  <ContextMenuItem
                    className="flex items-center gap-2"
                    onClick={handleClick}
                  >
                    <EyeIcon size={16} className="text-muted-foreground" />
                    View feature
                  </ContextMenuItem>
                ) : null}
                {gantt.onCopyItemLink ? (
                  <ContextMenuItem
                    className="flex items-center gap-2"
                    onClick={handleCopyLink}
                  >
                    <LinkIcon size={16} className="text-muted-foreground" />
                    Copy link
                  </ContextMenuItem>
                ) : null}
                {gantt.editable && gantt.onRemoveItem ? (
                  <ContextMenuItem
                    className="flex items-center gap-2 text-destructive"
                    onClick={handleRemove}
                  >
                    <TrashIcon size={16} />
                    Remove from roadmap
                  </ContextMenuItem>
                ) : null}
              </ContextMenuContent>
            </ContextMenu>
          </div>
        </HoverCardTrigger>
        <HoverCardContent align="start" className="space-y-1">
          <p className="font-medium text-xs">{feature.name}</p>
          <div className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: feature.status.color }}
            />
            <p className="text-xs">{feature.status.name}</p>
          </div>
          <Separator />
          {feature.owner && (
            <div className="flex items-center gap-2">
              <Avatar
                size={16}
                src={feature.owner.image}
                fallback={feature.owner.name?.slice(0, 2)}
              />
              <p className="text-xs">{feature.owner.name}</p>
            </div>
          )}
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};
