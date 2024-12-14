'use client';

import { DataTable } from '@/components/ui/table/data-table';
import { DataTableFilterBox } from '@/components/ui/table/data-table-filter-box';
import { DataTableResetFilter } from '@/components/ui/table/data-table-reset-filter';
import { DataTableSearch } from '@/components/ui/table/data-table-search';
import { UserData } from '@/types/user';
import { columns } from '../students-tables/columns';
import { useEmployeeTableFilters } from './use-student-table-filters';

export default function StudentsTable({
  data,
  totalData
}: {
  data: UserData[];
  totalData: number;
}) {
  const {
    departmentFilter,
    setDepartmentFilter,
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery,
    departments
  } = useEmployeeTableFilters();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <DataTableSearch
          searchKey="name"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setPage={setPage}
        />
        <DataTableFilterBox
          filterKey="department"
          title="DEPARTMENT"
          options={departments}
          setFilterValue={setDepartmentFilter}
          filterValue={departmentFilter}
        />
        <DataTableResetFilter
          isFilterActive={isAnyFilterActive}
          onReset={resetFilters}
        />
      </div>
      <DataTable columns={columns} data={data} totalItems={totalData} />
    </div>
  );
}
