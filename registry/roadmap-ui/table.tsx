import { Button } from '@roadmap-ui/shadcn-ui/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@roadmap-ui/shadcn-ui/components/ui/dropdown-menu';
import {
  TableBody as TableBodyRaw,
  TableCell,
} from '@roadmap-ui/shadcn-ui/components/ui/table';
import {
  TableHead,
  TableHeader as TableHeaderRaw,
  TableRow,
} from '@roadmap-ui/shadcn-ui/components/ui/table';
import { Table } from '@roadmap-ui/shadcn-ui/components/ui/table';
import { cn } from '@roadmap-ui/shadcn-ui/lib/utils';
import type { Column } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type { ColumnDef, Table } from '@tanstack/react-table';
import type { SortingState } from '@tanstack/react-table';
import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDownIcon } from 'lucide-react';
import type { HTMLAttributes } from 'react';
import { type FC, useContext } from 'react';
import type { ReactNode } from 'react';
import { createContext } from 'react';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type TableState = {
  sorting: SortingState;
  setSorting: (sorting: SortingState) => void;
};

export const useTable = create<TableState>()(
  devtools((set) => ({
    sorting: [],
    setSorting: (sorting: SortingState) => set(() => ({ sorting })),
  }))
);

export const TableContext = createContext<{
  data: unknown[];
  columns: ColumnDef<unknown, unknown>[];
  table: Table<unknown> | null;
}>({
  data: [],
  columns: [],
  table: null,
});

type TableProviderProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  children: ReactNode;
};

export function TableProvider<TData, TValue>({
  columns,
  data,
  children,
}: TableProviderProps<TData, TValue>) {
  const { sorting, setSorting } = useTable();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: (updater) => {
      // @ts-expect-error updater is a function that returns a sorting object
      const newSorting = updater(sorting);

      setSorting(newSorting);
    },
    state: {
      sorting,
    },
  });

  return (
    <TableContext.Provider
      value={{
        data,
        columns: columns as never,
        table: table as never,
      }}
    >
      <Table>{children}</Table>
    </TableContext.Provider>
  );
}

export const TableHeader: FC = () => {
  const { table } = useContext(TableContext);

  return (
    <TableHeaderRaw>
      {table?.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeaderRaw>
  );
};

interface TableColumnHeaderProps<TData, TValue>
  extends HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function TableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: TableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {column.getIsSorted() === 'desc' ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'asc' ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <ChevronsUpDownIcon className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export const TableBody: FC = () => {
  const { columns, table } = useContext(TableContext);
  const rows = table?.getRowModel().rows;

  return (
    <TableBodyRaw>
      {rows?.length ? (
        rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      )}
    </TableBodyRaw>
  );
};
