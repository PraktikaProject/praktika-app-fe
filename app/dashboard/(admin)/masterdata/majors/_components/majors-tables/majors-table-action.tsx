'use client';
import PopupModal from '@/components/shared/popup-modal';
import MajorsCreateForm from '../majors-form/majors-add-form';
import { DepartementsData } from '@/types/base';

type DepartementsTableActionsProps = {
  departements: DepartementsData[];
};

export default function DepartementsTableActions({
  departements
}: DepartementsTableActionsProps) {
  return (
    <div className="ml-auto flex items-center justify-end pb-5">
      <PopupModal
        renderModal={(onClose) => (
          <MajorsCreateForm modalClose={onClose} departements={departements} />
        )}
      />
    </div>
  );
}
