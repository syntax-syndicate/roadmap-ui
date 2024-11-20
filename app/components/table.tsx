'use client';

import { exampleFeatures } from '@/lib/content';
import {
  TableBody,
  TableColumnHeader,
  TableHeader,
  TableProvider,
} from '@/registry/roadmap-ui/table';
import type { ColumnDef } from '@tanstack/react-table';
import { ChevronRightIcon } from 'lucide-react';
import Image from 'next/image';
import type { FC } from 'react';

export const TableExampleCustom: FC = () => {
  const columns: ColumnDef<(typeof exampleFeatures)[number]>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="relative">
            <Image
              src={row.original.owner.image}
              alt={row.original.owner.name}
              width={24}
              height={24}
              unoptimized
              className="rounded-full w-6 h-6"
            />
            <div
              className="w-2 h-2 ring-2 ring-background rounded-full absolute bottom-0 right-0"
              style={{
                backgroundColor: row.original.status.color,
              }}
            />
          </div>
          <div>
            <span className="font-medium">{row.original.name}</span>
            <div className="flex items-center gap-1 text-muted-foreground text-xs">
              <span>{row.original.product.name}</span>
              <ChevronRightIcon size={12} />
              <span>{row.original.group.name}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'startAt',
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Start At" />
      ),
      cell: ({ row }) =>
        new Intl.DateTimeFormat('en-US', {
          dateStyle: 'medium',
        }).format(row.original.startAt),
    },
    {
      accessorKey: 'endAt',
      header: ({ column }) => (
        <TableColumnHeader column={column} title="End At" />
      ),
      cell: ({ row }) =>
        new Intl.DateTimeFormat('en-US', {
          dateStyle: 'medium',
        }).format(row.original.endAt),
    },
  ];

  return (
    <TableProvider columns={columns} data={exampleFeatures}>
      <TableHeader />
      <TableBody />
    </TableProvider>
  );
};
