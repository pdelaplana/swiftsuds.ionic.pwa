import {
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonInput,
} from '@ionic/react';
import InputFormField from '@src/pages/components/form/InputFormField';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';

interface ShopAddressFormProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  errors?: FieldErrors<{
    streetAddress1: string;
    streetAddress2: string;
    cityOrSuburb: string;
    stateOrProvince: string;
    postCode: string;
  }>;
}

const validationRules = {
  streetAddress1: {
    required: 'Address is required',
  },
  streetAddress2: {
    maxLength: {
      value: 100,
      message: 'Address line must be less than 100 characters',
    },
  },
  cityOrSuburb: {
    required: 'City is required',
    maxLength: {
      value: 50,
      message: 'City name must be less than 50 characters',
    },
  },
  stateOrProvince: {
    required: 'State is required',
    maxLength: {
      value: 50,
      message: 'State name must be less than 50 characters',
    },
  },
  postCode: {
    required: 'Postal code is required',
    pattern: {
      value: /^[0-9]{5}$/,
      message: 'Enter a valid postal code',
    },
  },
};

const ShopAddressForm: React.FC<ShopAddressFormProps> = ({
  register,
  setValue,
  errors,
}) => {
  return (
    <IonList lines='none'>
      <IonItem lines='full'>
        <IonLabel>
          <InputFormField
            name='address.streetAddress1'
            label='Street'
            register={register}
            setValue={setValue}
            type='text'
            validationRules={validationRules.streetAddress1}
            error={errors?.streetAddress1}
          />
        </IonLabel>
      </IonItem>
      <IonItem lines='full'>
        <IonLabel>
          <InputFormField
            name='address.streetAddress2'
            label='Unit / Apt / Other (Optional)'
            register={register}
            setValue={setValue}
            type='text'
            //validationRules={validationRules.streetAddress2}
            error={errors?.streetAddress2}
          />
        </IonLabel>
      </IonItem>
      <IonItem lines='full'>
        <IonLabel>
          <InputFormField
            name='address.cityOrSuburb'
            label='City'
            register={register}
            setValue={setValue}
            type='text'
            validationRules={validationRules.cityOrSuburb}
            error={errors?.cityOrSuburb}
          />
        </IonLabel>
      </IonItem>
      <IonItem lines='full'>
        <IonLabel>
          <InputFormField
            name='address.stateOrProvince'
            label='Province'
            register={register}
            setValue={setValue}
            type='text'
            validationRules={validationRules.stateOrProvince}
            error={errors?.stateOrProvince}
          />
        </IonLabel>
      </IonItem>
      <IonItem lines='full'>
        <IonLabel>
          <InputFormField
            name='address.postCode'
            label='Post Code'
            register={register}
            setValue={setValue}
            type='text'
            //validationRules={validationRules.postCode}
            error={errors?.postCode}
          />
        </IonLabel>
      </IonItem>
    </IonList>
  );
};

export default ShopAddressForm;
