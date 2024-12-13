import axios from 'axios';
import { CuriculaData } from '@/types/base';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import CuriculaTable from './curicula-tables';
import CuriculaTableActions from './curicula-tables/curicula-table-action';

type TCuriculaListingPage = {};

export default async function CuriculaListingPage({}: TCuriculaListingPage) {
  const curicula = await axios.get('http://localhost:3002/data/curicula.json');
  const curiculaData: CuriculaData[] = curicula.data.data;
  const totalData = curiculaData.length;

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Curicula (${totalData})`}
            description="List of all curicula in Praktika APP"
          />
          <CuriculaTableActions />
        </div>
        <Separator />
        <CuriculaTable data={curiculaData} totalData={totalData} />
      </div>
    </PageContainer>
  );
}
