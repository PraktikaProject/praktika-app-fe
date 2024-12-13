import axios from 'axios';
import { MajorsData, DepartementsData } from '@/types/base';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import MajorsTable from './majors-tables';
import MajorsTableActions from './majors-tables/majors-table-action';

type TMajorsListingPage = {};

const BASE_URI = process.env.NEXT_PUBLIC_BACKEND_URL;
export default async function MajorsListingPage({}: TMajorsListingPage) {
  const majors = await axios.get(`${BASE_URI}/bases/majors`);
  const departements = await axios.get(`${BASE_URI}/bases/departements`);
  const departementsData: DepartementsData[] = departements.data.data;
  const majorsData: MajorsData[] = majors.data.data;
  const totalData = majorsData.length;

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Majors (${totalData})`}
            description="List of all Majors in Praktika APP"
          />
          <MajorsTableActions departements={departementsData} />
        </div>
        <Separator />
        <MajorsTable data={majorsData} totalData={totalData} />
      </div>
    </PageContainer>
  );
}
