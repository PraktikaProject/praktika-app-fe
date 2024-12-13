import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';
import { useState } from 'react';
import DepartementsUpdateForm from '../departements-form/departements-update-form';
import { Modal } from '@/components/ui/modal';
import { DepartementsData } from '@/types/base';

interface CellActionProps {
  data: DepartementsData;
}
export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const onConfirm = async () => {};

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
        <DepartementsUpdateForm
          modalClose={() => setOpenUpdate(false)}
          data={data}
        />
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
