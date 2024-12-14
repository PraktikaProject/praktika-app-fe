import { ScrollArea } from '@/components/ui/scroll-area';
import LecturersForm from './lecturers-form';

export default function LecturersViewPage() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <LecturersForm />
      </div>
    </ScrollArea>
  );
}
