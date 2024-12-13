'use client';
import PopupModal from '@/components/shared/popup-modal';
import DepartementsCreateForm from '../departements-form/departements-add-form';

export default function DepartementsTableActions() {
  return (
    <div className=" ml-auto flex items-center justify-end pb-5">
      <PopupModal
        renderModal={(onClose) => (
          <DepartementsCreateForm modalClose={onClose} />
        )}
      />
    </div>
  );
}
