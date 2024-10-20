import { Table } from '@roadmap-ui/shadcn-ui/components/ui/table';
import {
  type ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type { ReactNode } from 'react';
import { TableContext } from '../contexts/table-context';
import { useTable } from '../hooks/use-table';

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
        columns,
        table,
      }}
    >
      <Table>{children}</Table>
    </TableContext.Provider>
  );
}
