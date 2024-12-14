'use client';
import { DataTable } from '@/components/ui/table/data-table';
import { MajorsData } from '@/types/base';
import { columns } from './columns';

export default function DepartementsTable({
  data,
  totalData
}: {
  data: MajorsData[];
  totalData: number;
}) {
  return (
    <div className="space-y-4 ">
      <DataTable columns={columns} data={data} totalItems={totalData} />
    </div>
  );
}
