import { Address } from '@src/domain';
import { Field, FieldError, FormState, UseFormRegister } from 'react-hook-form';
import InputFormField from './InputFormField';
import { IonList, IonItem, IonLabel } from '@ionic/react';
import { add } from 'ionicons/icons';

interface IAddressFormFieldsProps {
  address: Address;
  register: UseFormRegister<any>;
  errors?: FormState<any>;
}

const AddressFormFields: React.FC<IAddressFormFieldsProps> = ({
  address,
  register,
  errors,
}) => {
  return (
    <IonList>
      <IonItem>
        <IonLabel>
          <InputFormField
            name='address.streetAddress1'
            label='Street'
            register={register}
            validationRules={{ required: 'Street is required' }}
          />
        </IonLabel>
      </IonItem>
    </IonList>
  );
};

export default AddressFormFields;
