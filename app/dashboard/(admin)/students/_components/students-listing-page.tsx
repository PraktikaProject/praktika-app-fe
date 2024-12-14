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
import { UserData } from '@/types/user';

type TStudentsListingPage = {};

export default async function StudentsListingPage({}: TStudentsListingPage) {
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const gender = searchParamsCache.get('gender');
  const pageLimit = searchParamsCache.get('limit');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(gender && { genders: gender })
  };

  const BASE_URI = process.env.NEXT_PUBLIC_BACKEND_URL;

  const students = await axios.get(`${BASE_URI}/users/students`);
  const studentData: UserData[] = students.data.data;
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
            href={'/dashboard/employee/new'}
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
