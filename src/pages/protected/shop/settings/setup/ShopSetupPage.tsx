import { IonList, IonItem, IonLabel, IonInput, IonIcon } from '@ionic/react';
import ShopPage from '../../ShopPage';
import { businessOutline, locationOutline } from 'ionicons/icons';
import InputFormField from '@src/pages/components/form/InputFormField';
import { RegisterOptions, UseFormRegisterReturn } from 'react-hook-form';
import { useShop } from '@src/features/shop/ShopProvider';

const ShopSetupPage: React.FC = () => {
  const { shop } = useShop();
  return (
    <ShopPage title='Edit' defaultBackButtonHref='/shop/settings'>
      <IonList>
        <IonItem lines='full'>
          <IonLabel>
            <IonInput
              label='Name'
              labelPlacement='floating'
              placeholder='Enter your name'
              value={shop?.name}
            ></IonInput>
          </IonLabel>
        </IonItem>
        <IonItem lines='full' button detail>
          <IonIcon
            icon={locationOutline}
            slot='start'
            color='success'
          ></IonIcon>
          <IonLabel>
            <h2>Address</h2>
            <small color='medium'>Enter your addrss</small>
          </IonLabel>
        </IonItem>
        <IonItem lines='full' button detail>
          <IonLabel>
            <h2>Email</h2>
            <small color='medium'>Enter your name</small>
          </IonLabel>
        </IonItem>
        <IonItem lines='full' button detail>
          <IonLabel>
            <h2>Phone</h2>
            <small color='medium'>Enter your name</small>
          </IonLabel>
        </IonItem>
        <IonItem lines='full' button detail>
          <IonLabel>
            <h2>Website</h2>
            <small color='medium'>Enter your name</small>
          </IonLabel>
        </IonItem>
      </IonList>
    </ShopPage>
  );
};

export default ShopSetupPage;
