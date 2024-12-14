import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { searchParamsCache } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import StudentsTable from './students-tables';
import axios from 'axios';
import { StudentsData } from '@/types/user';

type TStudentsListingPage = {};

export default async function StudentsListingPage({}: TStudentsListingPage) {
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

  const students = await axios.get(
    `${BASE_URI}/users/students?${new URLSearchParams(filters).toString()}`
  );
  const studentData: StudentsData[] = students.data.data;
  const totalUsers = studentData.length;

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Students (${totalUsers})`}
            description="List of all students in Praktika APP"
          />

          <Link
            href={'/dashboard/students/new'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <StudentsTable data={studentData} totalData={totalUsers} />
      </div>
    </PageContainer>
  );
}
