import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { searchParamsCache } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import LecturersTable from './lecturers-tables';
import axios from 'axios';
import { LecturersData } from '@/types/user';

type TLecturersListingPage = {};

export default async function LecturersListingPage({}: TLecturersListingPage) {
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const departement = searchParamsCache.get('department');
  const pageLimit = searchParamsCache.get('limit');

  const filters = {
    page: page?.toString(),
    limit: pageLimit?.toString(),
    ...(search && { search }),
    ...(departement && { departements: departement })
  };

  console.log(filters);

  const BASE_URI = process.env.NEXT_PUBLIC_BACKEND_URL;

  const lecturers = await axios.get(
    `${BASE_URI}/users/lecturers?${new URLSearchParams(filters).toString()}`
  );
  const lecturersData: LecturersData[] = lecturers.data.data;
  const totalUsers = lecturersData.length;

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Lecturers (${totalUsers})`}
            description="List of all lecturers in Praktika APP"
          />

          <Link
            href={'/dashboard/lecturers/new'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />

        <LecturersTable data={lecturersData} totalData={totalUsers} />
      </div>
    </PageContainer>
  );
}
