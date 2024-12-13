'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { UserData } from '@/types/user';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<UserData>[] = [
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
    accessorKey: 'myits_id',
    header: 'NIDN'
  },

  {
    accessorKey: 'full_name',
    header: 'NAME'
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
    id: 'actions',
    cell: ({ row }) => <CellAction />
  }
];
