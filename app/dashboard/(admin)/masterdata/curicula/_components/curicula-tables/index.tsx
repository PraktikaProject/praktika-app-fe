'use client';
import { DataTable } from '@/components/ui/table/data-table';
import { CuriculaData } from '@/types/base';
import { columns } from './columns';

export default function CuriculaTable({
  data,
  totalData
}: {
  data: CuriculaData[];
  totalData: number;
}) {
  return (
    <div className="space-y-4 ">
      <DataTable columns={columns} data={data} totalItems={totalData} />
    </div>
  );
}
