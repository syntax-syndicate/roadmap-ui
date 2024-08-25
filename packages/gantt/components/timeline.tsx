import { type FC, type ReactNode, useContext } from 'react';
import { GanttContext } from '../contexts/gantt-context';
import { NewMarkerTrigger } from './new-marker-trigger';

type TimelineProperties = {
  children: ReactNode;
};

export const Timeline: FC<TimelineProperties> = ({ children }) => {
  const gantt = useContext(GanttContext);

  return (
    <>
      {children}
      {gantt.onAddMarker && gantt.editable ? <NewMarkerTrigger /> : null}
    </>
  );
};
