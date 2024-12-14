'use client';

import { searchParams } from '@/lib/searchparams';
import { useQueryState } from 'nuqs';
import { useCallback, useMemo, useEffect, useState } from 'react';
import axios from 'axios';
import { DepartementsData } from '@/types/base';

export function useEmployeeTableFilters() {
  const [searchQuery, setSearchQuery] = useQueryState(
    'q',
    searchParams.q
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault('')
  );

  const [departmentFilter, setDepartmentFilter] = useQueryState(
    'department',
    searchParams.department.withOptions({ shallow: false }).withDefault('')
  );

  const [page, setPage] = useQueryState(
    'page',
    searchParams.page.withDefault(1)
  );

  const [departments, setDepartments] = useState<
    { value: string; label: string }[]
  >([]);

  const BASE_URI = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    async function fetchDepartments() {
      try {
        const response = await axios.get(`${BASE_URI}/bases/departements`);
        const departementsData: DepartementsData[] = response.data.data;

        const departmentOptions = departementsData.map((department) => ({
          value: String(department.id),
          label: department.name
        }));

        setDepartments(departmentOptions);
      } catch (error) {
        console.error('Failed to fetch departments:', error);
      }
    }

    fetchDepartments();
  }, [BASE_URI]);

  const resetFilters = useCallback(() => {
    setSearchQuery(null);
    setDepartmentFilter(null);
    setPage(1);
  }, [setSearchQuery, setDepartmentFilter, setPage]);

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery || !!departmentFilter;
  }, [searchQuery, departmentFilter]);

  return {
    searchQuery,
    setSearchQuery,
    departmentFilter,
    setDepartmentFilter,
    page,
    setPage,
    resetFilters,
    isAnyFilterActive,
    departments
  };
}
