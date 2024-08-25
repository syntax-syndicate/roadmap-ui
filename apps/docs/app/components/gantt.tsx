'use client';

import { Gantt } from "@repo/gantt";
import { FC } from "react";

export const GanttExample: FC = () => (
  <Gantt
    features={[]}
    markers={[]}
    editable
    grouping="feature"
    onAddItem={console.log}
    onAddMarker={console.log}
    onCopyItemLink={console.log}
    onMoveItem={console.log}
    onRemoveItem={console.log}
    onRemoveMarker={console.log}
    onSelectItem={console.log}
    range="monthly"
    zoom={100}
  />
);