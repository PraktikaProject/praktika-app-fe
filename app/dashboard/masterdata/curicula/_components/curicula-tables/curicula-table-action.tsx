'use client';
import PopupModal from '@/components/shared/popup-modal';
import ZoneCreateForm from '../curicula-form/curicula-add-form';

export default function CuriculaTableActions() {
  return (
    <div className=" ml-auto flex items-center justify-end pb-5">
      <PopupModal
        renderModal={(onClose) => <ZoneCreateForm modalClose={onClose} />}
      />
    </div>
  );
}
