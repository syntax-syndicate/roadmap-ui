import { PlusIcon } from 'lucide-react';
import { type FC, type RefObject, useContext } from 'react';
import { GanttContext } from '../contexts/gantt-context';
import { useMouse } from '../hooks/use-mouse';
import { getDateByMousePosition } from '../lib/utils';

type AddFeatureHelperProps = {
  top: number;
};

export const AddFeatureHelper: FC<AddFeatureHelperProps> = ({ top }) => {
  const gantt = useContext(GanttContext);
  const mouse = useMouse(gantt.ref as RefObject<HTMLDivElement>);

  const handleClick = () => {
    const currentDate = getDateByMousePosition(gantt, mouse.x);

    gantt.onAddItem?.(currentDate);
  };

  return (
    <div
      className="absolute top-0 w-full px-0.5"
      style={{
        marginTop: -gantt.rowHeight / 2,
        transform: `translateY(${top}px)`,
      }}
    >
      <button
        onClick={handleClick}
        type="button"
        className="flex h-full w-full items-center justify-center rounded-md border border-dashed p-2"
      >
        <PlusIcon
          size={16}
          className="pointer-events-none select-none text-muted-foreground"
        />
      </button>
    </div>
  );
};
