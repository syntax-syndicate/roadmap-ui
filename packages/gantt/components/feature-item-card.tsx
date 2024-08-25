import { useDraggable } from '@dnd-kit/core';
import { Avatar } from '@repo/design-system/components/avatar';
import { Card } from '@repo/design-system/components/card';
import { cn } from '@repo/lib/cn';
import { type FC, useContext, useEffect } from 'react';
import { GanttContext } from '../contexts/gantt-context';
import { useGantt } from '../hooks/use-gantt';
import type { Feature } from '../types/types';

type FeatureItemCardProps = Pick<Feature, 'id' | 'owner' | 'name'>;

export const FeatureItemCard: FC<FeatureItemCardProps> = ({
  id,
  owner,
  name,
}) => {
  const gantt = useContext(GanttContext);
  const { setDragging } = useGantt();
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
    disabled: !gantt.editable,
  });
  const isPressed = Boolean(attributes['aria-pressed']);

  useEffect(() => setDragging(isPressed), [isPressed, setDragging]);

  return (
    <Card className="h-full w-full rounded-md bg-background p-2 text-xs shadow-sm">
      <div
        className={cn(
          'flex h-full w-full items-center justify-between gap-2 text-left',
          isPressed && 'cursor-grabbing'
        )}
        {...attributes}
        {...listeners}
        ref={setNodeRef}
      >
        <p className="flex-1 truncate text-xs">{name}</p>
        {owner && (
          <Avatar
            size={16}
            src={owner.image}
            fallback={owner.name?.slice(0, 2)}
          />
        )}
      </div>
    </Card>
  );
};
