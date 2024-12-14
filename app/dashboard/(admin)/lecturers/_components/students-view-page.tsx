import { ScrollArea } from '@/components/ui/scroll-area';
import LecturersForm from './students-form';

type LecturersViewPageProps = {
  data: number;
};

export default function LecturersViewPage({ data }: LecturersViewPageProps) {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <LecturersForm data={data} />
      </div>
    </ScrollArea>
  );
}
