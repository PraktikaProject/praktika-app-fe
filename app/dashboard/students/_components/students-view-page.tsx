import { ScrollArea } from '@/components/ui/scroll-area';
import StudentsForm from './students-form';

export default function StudentsViewPage() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <StudentsForm />
      </div>
    </ScrollArea>
  );
}
