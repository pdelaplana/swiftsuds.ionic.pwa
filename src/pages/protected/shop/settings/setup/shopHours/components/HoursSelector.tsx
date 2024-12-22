import React, { useRef, useState } from 'react';
import {
  IonButton,
  IonDatetime,
  IonItem,
  IonLabel,
  IonModal,
} from '@ionic/react';

const HoursSelector: React.FC = () => {
  const [openingTime, setOpeningTime] = useState<string>('08:00');
  const [closingTime, setClosingTime] = useState<string>('17:00');
  const [isOpeningModalOpen, setIsOpeningModalOpen] = useState(false);
  const [isClosingModalOpen, setIsClosingModalOpen] = useState(false);

  const opensAtModal = useRef<HTMLIonModalElement>(null);

  return (
    <div>
      <IonItem>
        <IonLabel>Opening Hours</IonLabel>
        <IonButton
          id='Opening-Hours'
          onClick={() => setIsOpeningModalOpen(true)}
        >
          {openingTime}
        </IonButton>
      </IonItem>
      <IonItem>
        <IonLabel>Closing Hours</IonLabel>
        <IonButton onClick={() => setIsClosingModalOpen(true)}>
          {closingTime}
        </IonButton>
      </IonItem>

      {/* Opening Time Modal */}
      <IonModal
        className='not-full-screen'
        ref={opensAtModal}
        trigger='Opening-Hours'
        onDidDismiss={() => setIsOpeningModalOpen(false)}
      >
        <IonDatetime
          presentation='time'
          value={openingTime}
          onIonChange={(e: CustomEvent) => setOpeningTime(e.detail.value!)}
        />
        <IonButton onClick={() => opensAtModal.current?.dismiss()}>
          Confirm
        </IonButton>
      </IonModal>

      {/* Closing Time Modal */}
      <IonModal
        className='not-full-screen'
        isOpen={isClosingModalOpen}
        onDidDismiss={() => setIsClosingModalOpen(false)}
      >
        <IonDatetime
          presentation='time'
          value={closingTime}
          onIonChange={(e: CustomEvent) => setClosingTime(e.detail.value!)}
        />
        <IonButton onClick={() => setIsClosingModalOpen(false)}>
          Confirm
        </IonButton>
      </IonModal>
    </div>
  );
};

export default HoursSelector;
