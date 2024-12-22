import {
  IonList,
  IonListHeader,
  IonText,
  IonItem,
  IonLabel,
  IonIcon,
} from '@ionic/react';
import InputFormField from '@src/pages/components/form/InputFormField';
import TextAreaFormField from '@src/pages/components/form/TextAreaFormField';
import { storefrontOutline } from 'ionicons/icons';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface ShopInformationFormProps {
  register: UseFormRegister<any>;
  setValue?: UseFormSetValue<any>;
  errors?: FieldErrors<{
    name: string;
    description: string;
    email: string;
    website: string;
    phone: string;
  }>;
}

const validationRules = {
  name: {
    required: 'Shop name is required',
    minLength: {
      value: 3,
      message: 'Shop name must be at least 3 characters long',
    },
    maxLength: {
      value: 50,
      message: 'Shop name must be less than 50 characters',
    },
  },
  description: {
    maxLength: {
      value: 500,
      message: 'Description must be less than 500 characters',
    },
  },
  website: {
    pattern: {
      value: /^(http|https):\/\/[^ "]+$/,
      message: 'Enter a valid website URL',
    },
  },
  email: {
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: 'Enter a valid email address',
    },
  },
  phone: {
    pattern: {
      value: /^[0-9]{1,15}$/,
      message: 'Enter a valid phone number',
    },
  },
};

const ShopInformationForm: React.FC<ShopInformationFormProps> = ({
  register,
  setValue,
  errors,
}) => {
  return (
    <IonList lines='none' className='ion-no-padding ion-no-margin'>
      <IonItem>
        <IonLabel>
          <strong>Shop Information</strong>
        </IonLabel>
      </IonItem>

      <IonItem lines='full'>
        <IonLabel>
          <InputFormField
            name='name'
            label='Name'
            placeholder={`What's your laundry shop called`}
            register={register}
            validationRules={validationRules.name}
            error={errors?.name}
          />
        </IonLabel>
      </IonItem>
      <IonItem lines='full'>
        <IonLabel>
          <TextAreaFormField
            name='description'
            label='Description'
            placeholder='Tell us a little bit about your laundry shop (optional)'
            register={register}
            error={errors?.description}
            validationRules={validationRules.description}
          />
        </IonLabel>
      </IonItem>

      <IonItem lines='full'>
        <IonLabel>
          <InputFormField
            name='email'
            label='Email'
            placeholder='Where can your customers reach you'
            register={register}
            error={errors?.email}
            type='email'
            validationRules={validationRules.email}
          />
        </IonLabel>
      </IonItem>
      <IonItem lines='full'>
        <IonLabel>
          <InputFormField
            name='phone'
            label='Phone'
            placeholder='Add a contact number for support or enquiries'
            register={register}
            error={errors?.phone}
            validationRules={validationRules.phone}
          />
        </IonLabel>
      </IonItem>
      <IonItem lines='full'>
        <IonLabel>
          <InputFormField
            name='website'
            label='Website'
            placeholder='Do you have a website? This helps customers find your store online.'
            register={register}
            error={errors?.website}
            validationRules={validationRules.website}
          />
        </IonLabel>
      </IonItem>
    </IonList>
  );
};

export default ShopInformationForm;
