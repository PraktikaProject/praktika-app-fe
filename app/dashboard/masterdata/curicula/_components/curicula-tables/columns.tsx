'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { CuriculaData } from '@/types/base';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<CuriculaData>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'year',
    header: 'TAHUN'
  },
  {
    size: 10,
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
