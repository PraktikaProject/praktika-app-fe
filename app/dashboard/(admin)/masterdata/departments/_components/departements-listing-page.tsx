import axios from 'axios';
import { DepartementsData } from '@/types/base';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import DepartementsTable from './departements-tables';
import DepartementsTableActions from './departements-tables/departements-table-action';

type TDepartementsListingPage = {};

const BASE_URI = process.env.NEXT_PUBLIC_BACKEND_URL;
export default async function DepartementsListingPage({}: TDepartementsListingPage) {
  const departements = await axios.get(`${BASE_URI}/bases/departements`);
  const departementsData: DepartementsData[] = departements.data.data;
  const totalData = departementsData.length;

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Departements (${totalData})`}
            description="List of all departements in Praktika APP"
          />
          <DepartementsTableActions />
        </div>
        <Separator />
        <DepartementsTable data={departementsData} totalData={totalData} />
      </div>
    </PageContainer>
  );
}
