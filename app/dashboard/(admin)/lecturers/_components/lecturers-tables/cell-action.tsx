import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import type { LecturersData } from '@/types/user';
import { Edit, Trash } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import Link from 'next/link';

interface CellActionProps {
  data: LecturersData;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading] = useState(false);
  const [open, setOpen] = useState(false);
  const BASE_URI = process.env.NEXT_PUBLIC_BACKEND_URL;

  const onConfirm = async () => {
    try {
      await axios.delete(`${BASE_URI}/users/students/${data.id}`);
      toast.success('Student deleted successfully');
    } catch (e) {
      console.log(e);
    }
    setOpen(false);
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <Link href={`/dashboard/students/${data.id}`}>
        <Button variant="outline" className="mr-3 px-2 pl-2">
          <Edit className="h-4 w-4" />
        </Button>
      </Link>
      <Button
        variant="destructive"
        className="px-2 py-2"
        onClick={() => setOpen(true)}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </>
  );
};
