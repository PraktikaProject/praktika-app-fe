import { ScrollArea } from '@/components/ui/scroll-area';
import StudentsForm from './students-form';

type StudentsViewPageProps = {
  data: number;
};

export default function StudentsViewPage({ data }: StudentsViewPageProps) {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <StudentsForm data={data} />
      </div>
    </ScrollArea>
  );
}
