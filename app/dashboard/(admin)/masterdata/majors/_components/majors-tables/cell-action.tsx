import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';
import { useState } from 'react';
import MajorsUpdateForm from '../majors-form/majors-update-form';
import { Modal } from '@/components/ui/modal';
import { MajorsData } from '@/types/base';
import axios from 'axios';
import { toast } from 'sonner';

interface CellActionProps {
  data: MajorsData;
}
export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const BASE_URI = process.env.NEXT_PUBLIC_BACKEND_URL;
  const onConfirm = async () => {
    try {
      await axios.delete(`${BASE_URI}/bases/majors/${data.id}`);
      toast.success('Majors deleted successfully');
    } catch (e) {
      console.log(e);
    }
    setOpen(false);
  };
  return (
    <div className="ml-auto max-w-sm  text-center">
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />

      <Modal
        isOpen={openUpdate}
        onClose={() => setOpenUpdate(false)}
        className="m-0 max-w-96 p-0"
      >
        <MajorsUpdateForm modalClose={() => setOpenUpdate(false)} data={data} />
      </Modal>
      <Button
        variant="outline"
        className="mr-3 px-2 pl-2"
        onClick={() => setOpenUpdate(true)}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        variant="destructive"
        className="px-2 py-2"
        onClick={() => setOpen(true)}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};
