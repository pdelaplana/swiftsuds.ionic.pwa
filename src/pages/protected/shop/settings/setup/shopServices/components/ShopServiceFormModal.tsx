import { IonItem, IonLabel, IonList, useIonModal } from '@ionic/react';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import { Service } from '@src/domain/entities/service';

import InputFormField from '@src/pages/components/form/InputFormField';
import { usePrompt } from '@src/pages/components/hooks/usePrompt';
import ModalPage from '@src/pages/components/modal/ModalPage';
import NiceButton from '@src/pages/components/ui/NiceButton';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import NiceTags from '@src/pages/components/ui/NiceTags';
import { FixedBottomContainer } from '@src/pages/components/layouts';

interface ShopServiceForm {
  id?: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  maxQuantity?: number;
  maxWeightKG?: number;
  tags: string[];
  sequence: number;
}

const validationRules = {
  name: {
    required: 'Name is required',
    minLength: {
      value: 3,
      message: 'Service name must be at least 3 characters long',
    },
    maxLength: {
      value: 50,
      message: 'Name must be less than 50 characters',
    },
  },
  description: {
    maxLength: {
      value: 500,
      message: 'Description must be less than 500 characters',
    },
  },
  price: {
    required: 'Price is required',
    min: {
      value: 0,
      message: 'Price must be greater than 0',
    },
  },
  quantity: {
    required: 'Quantity is required',
    min: {
      value: 0,
      message: 'Quantity must be greater than 0',
    },
  },
  maxQuantity: {
    required: 'Max pieces per order is required',
    min: {
      value: 0,
      message: 'Max pieces per order must be greater than 0',
    },
  },
  maxWeightKG: {
    required: 'Max weight per order is required',
    max: {
      value: 10,
      message: 'Max quantity per order must be not exceed 10 kg',
    },
  },
};

interface ShopServiceFormModalProps {
  service?: Service;
  suggestedTags: string[];
  onDismiss: (data?: any, role?: string) => void;
}

const ShopServiceFormModal: React.FC<ShopServiceFormModalProps> = ({
  service,
  suggestedTags,
  onDismiss,
}) => {
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
    reset,
  } = useForm<ShopServiceForm>({
    defaultValues: {
      id: service?.id.length === 0 ? uuidv4() : service?.id,
      name: service?.name ?? '',
      description: service?.description ?? '',
      price: service?.price ?? 0,
      quantity: service?.quantity ?? 0,
      maxQuantity: service?.maxQuantity ?? 0,
      maxWeightKG: service?.maxWeightKG ?? 0,
      tags: service?.tags ?? [],
      sequence: service?.sequence ?? 0,
    },
  });

  const { showConfirmPrompt } = usePrompt();

  const confirmAndDelete = async () => {
    showConfirmPrompt({
      title: 'Confirm Delete',
      message:
        'Cannot be undone. Are you sure you want to delete this service?',
      onConfirm: () => onDismiss(service, 'delete'),
      onCancel: () => console.log('Alert canceled'),
    });
  };

  const onSubmit: SubmitHandler<ShopServiceForm> = async (formData) => {
    if (formData.id) onDismiss(formData, 'confirm');
  };

  const onDelete = async () => {
    confirmAndDelete();
  };

  return (
    <ModalPage title={'Add Service'} onDismiss={onDismiss}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <IonList lines='none'>
          <IonItem lines='full'>
            <IonLabel>
              <InputFormField
                name='name'
                label='Name'
                register={register}
                setValue={setValue}
                validationRules={validationRules.name}
                error={errors?.name}
              />
            </IonLabel>
          </IonItem>
          <IonItem lines='full'>
            <IonLabel>
              <InputFormField
                name='description'
                label='Description'
                register={register}
                setValue={setValue}
                validationRules={validationRules.description}
                error={errors?.description}
              />
            </IonLabel>
          </IonItem>
          <IonItem lines='full'>
            <IonLabel>
              <InputFormField
                name='price'
                label='Price'
                register={register}
                setValue={setValue}
                type='number'
                validationRules={validationRules.price}
                error={errors?.price}
              />
            </IonLabel>
          </IonItem>
          <IonItem lines='full'>
            <IonLabel>
              <InputFormField
                name='maxQuantity'
                label='Max Piece Count Per Order'
                register={register}
                setValue={setValue}
                type='number'
                validationRules={validationRules.maxQuantity}
                error={errors?.maxQuantity}
              />
            </IonLabel>
          </IonItem>
          <IonItem lines='full'>
            <IonLabel>
              <InputFormField
                name='maxWeightKG'
                label='Max Weight In Kilos Per Order'
                register={register}
                setValue={setValue}
                type='number'
                validationRules={validationRules.maxWeightKG}
                error={errors?.maxWeightKG}
              />
            </IonLabel>
          </IonItem>
        </IonList>
        <div className='ion-padding ion-border-bottom'>
          <NiceTags
            initialTags={getValues('tags')}
            suggestions={suggestedTags}
            onTagsChange={(tags) => {
              setValue('tags', tags, { shouldDirty: true });
            }}
          />
        </div>

        <FixedBottomContainer>
          <NiceButton
            type='submit'
            disabled={!isDirty}
            className='ion-margin'
            isLoading={false}
            isDisabled={false}
            expand='full'
          >
            Save
          </NiceButton>
          {service && service.id && (
            <NiceButton
              expand='full'
              color='danger'
              className='ion-margin'
              isLoading={false}
              isDisabled={false}
              fill='clear'
              size='small'
              onClick={onDelete}
            >
              Delete
            </NiceButton>
          )}
        </FixedBottomContainer>
      </form>
    </ModalPage>
  );
};

export default ShopServiceFormModal;

export const useShopServiceFormModal = (): {
  open: (
    service: Service,
    suggestedTags: string[]
  ) => Promise<{ updated: Service; role: string }>;
} => {
  const [inputs, setInputs] = useState<{
    service: Service;
    suggestedTags: string[];
  }>();

  const [present, dismiss] = useIonModal(ShopServiceFormModal, {
    service: inputs?.service,
    suggestedTags: inputs?.suggestedTags,
    onDismiss: (data: any, role: string) => dismiss(data, role),
  });

  return {
    open: (service: Service, suggestedTags: string[]) => {
      setInputs({ service, suggestedTags });
      return new Promise(async (resolve) => {
        present({
          onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
            if (ev.detail.role) {
              resolve({ updated: ev.detail.data, role: ev.detail.role });
            }
          },
        });
      });
    },
  };
};
