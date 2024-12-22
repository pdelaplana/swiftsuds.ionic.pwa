import {
  IonPage,
  IonContent,
  IonBackButton,
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { CenteredContainer } from '@src/pages/components/layouts';
import { cartOutline, personOutline } from 'ionicons/icons';
import { PropsWithChildren } from 'react';

interface ICustomerPageProps extends PropsWithChildren {
  title?: string;
  showHeader?: boolean;
  showProfileIcon?: boolean;
  children: React.ReactNode;
  defaultBackButtonHref?: string;
}

const CustomerPage: React.FC<ICustomerPageProps> = ({
  title,
  showProfileIcon = true,
  showHeader = true,
  defaultBackButtonHref,
  children,
}) => {
  return (
    <IonPage>
      <IonHeader className='ion-no-border' hidden={!showHeader}>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton defaultHref={defaultBackButtonHref} />
          </IonButtons>
          <IonTitle>{title}</IonTitle>
          {showProfileIcon && (
            <IonButtons slot='end'>
              <IonButton routerLink='/cart'>
                <IonIcon slot='icon-only' icon={cartOutline} size='default' />
                {/* <CartBadge /> */}
              </IonButton>
              <IonButton routerLink='/profile'>
                <IonIcon slot='icon-only' icon={personOutline} size='default' />
              </IonButton>
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <CenteredContainer>{children}</CenteredContainer>
      </IonContent>
    </IonPage>
  );
};

export default CustomerPage;
