import { IonList, IonItem, IonLabel } from '@ionic/react';
import InputFormField from '@src/pages/components/form/InputFormField';
import TextAreaFormField from '@src/pages/components/form/TextAreaFormField';
import { UseFormRegister, FieldErrors, UseFormSetValue } from 'react-hook-form';

interface ShopInformationFormProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
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
  /*
  phone: {
    pattern: {
      value: /^[0-9]{10}$/,
      message: 'Enter a valid phone number',
    },
  },
  */
};

const ShopInformationForm: React.FC<ShopInformationFormProps> = ({
  register,
  setValue,
  errors,
}) => {
  return (
    <IonList lines='none' className='ion-no-padding ion-no-margin'>
      <IonItem lines='full'>
        <IonLabel>
          <InputFormField
            name='name'
            label='Shop Name'
            register={register}
            setValue={setValue}
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
            register={register}
            setValue={setValue}
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
            register={register}
            setValue={setValue}
            error={errors?.email}
            validationRules={validationRules.email}
          />
        </IonLabel>
      </IonItem>
      <IonItem lines='full'>
        <IonLabel>
          <InputFormField
            name='website'
            label='Website'
            register={register}
            setValue={setValue}
            error={errors?.website}
            validationRules={validationRules.website}
          />
        </IonLabel>
      </IonItem>
      <IonItem lines='full'>
        <IonLabel>
          <InputFormField
            name='phone'
            label='Phone'
            register={register}
            setValue={setValue}
            error={errors?.phone}
            //validationRules={validationRules.phone}
          />
        </IonLabel>
      </IonItem>
    </IonList>
  );
};

export default ShopInformationForm;
