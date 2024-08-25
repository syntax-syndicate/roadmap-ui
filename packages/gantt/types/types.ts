import type { RefObject } from 'react';

export type Feature = {
  id: string;
  name: string;
  startAt: Date;
  endAt: Date | null;
  status: {
    name: string;
    color: string;
  };
  initiative?: {
    id: string;
    name: string;
  };
  product?: {
    id: string;
    name: string;
  };
  group?: {
    id: string;
    name: string;
  };
  release?: {
    id: string;
    name: string;
  };
  owner?: {
    id: string;
    name: string;
    image: string;
  };
};

export type Range = 'daily' | 'monthly' | 'quarterly';

export type Grouping =
  | 'feature'
  | 'initiative'
  | 'product'
  | 'group'
  | 'owner'
  | 'release';

export type TimelineData = {
  year: number;
  quarters: {
    months: {
      days: number;
    }[];
  }[];
}[];

export type GanttContextProps = {
  zoom: number;
  range: Range;
  grouping: Grouping;
  columnWidth: number;
  headerHeight: number;
  rowHeight: number;
  onSelectItem: ((id: string) => void) | undefined;
  onAddItem: ((date: Date) => void) | undefined;
  onMoveItem:
    | ((id: string, startDate: Date, endDate: Date | null) => void)
    | undefined;
  onCopyItemLink: ((id: string) => void) | undefined;
  onRemoveItem: ((id: string) => void) | undefined;
  groups: Record<string, Feature[]>;
  placeholderLength: number;
  timelineData: TimelineData;
  editable: boolean;
  ref: RefObject<HTMLDivElement> | null;
};
