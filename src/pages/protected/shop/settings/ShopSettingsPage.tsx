import React from 'react';
import ShopPage from '../ShopPage';
import {
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonIcon,
  IonText,
} from '@ionic/react';
import { useAuth } from '@src/features/auth/AuthProvider';
import {
  albumsOutline,
  businessOutline,
  chatbubblesOutline,
  locationOutline,
  pricetagsOutline,
  time,
  timeOutline,
} from 'ionicons/icons';

const ShopSettingsPage: React.FC = () => {
  const { user } = useAuth();
  return (
    <ShopPage>
      <div className='ion-padding'>Your Shop</div>
      <IonList className=''>
        <IonItem
          button={true}
          detail={true}
          lines='full'
          routerLink='/settings/shop/info'
          style={{ vertical: 'top' }}
        >
          <IonIcon icon={businessOutline} slot='start'></IonIcon>
          <IonLabel>
            <h2>Basic Information</h2>
            <p>
              Update your shop’s name, contact details, and email to keep
              customer communication seamless.
            </p>
          </IonLabel>
        </IonItem>
        <IonItem
          button={true}
          detail={true}
          lines='full'
          routerLink='/settings/shop/address'
        >
          <IonIcon icon={locationOutline} slot='start'></IonIcon>
          <IonLabel>
            <h2>Address</h2>
            <p>
              Edit your shop’s location to ensure customers can find you easily.
            </p>
          </IonLabel>
        </IonItem>
        <IonItem
          button={true}
          detail={true}
          lines='full'
          routerLink='/settings/shop/services'
        >
          <IonIcon icon={pricetagsOutline} slot='start'></IonIcon>
          <IonLabel>
            <h2>Available Services</h2>
            <p>
              Keep your list of services up-to-date to inform customers of
              what’s offered.
            </p>
          </IonLabel>
        </IonItem>
        <IonItem
          button={true}
          detail={true}
          lines='full'
          routerLink='/settings/shop/hours'
        >
          <IonIcon icon={timeOutline} slot='start'></IonIcon>
          <IonLabel>
            <h2>Operating Hours</h2>
            <p>
              Set or update your shop's operating hours to let customers know
              when you're available
            </p>
          </IonLabel>
        </IonItem>
        <IonItem button={true} detail={true} lines='none'>
          <IonIcon icon={chatbubblesOutline} slot='start'></IonIcon>
          <IonLabel>
            <h2>Your Reviews</h2>
          </IonLabel>
        </IonItem>
      </IonList>
    </ShopPage>
  );
};

export default ShopSettingsPage;
