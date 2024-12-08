'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { StudentData } from '@/types/students';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<StudentData>[] = [
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
    accessorKey: 'full_name',
    header: 'NAME'
  },
  {
    accessorKey: 'myits_id',
    header: 'NRP'
  },
  {
    accessorKey: 'department',
    header: 'DEPARTMENT'
  },
  {
    accessorKey: 'major',
    header: 'MAJOR'
  },
  {
    accessorKey: 'semester',
    header: 'SEMESTER'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction />
  }
];
