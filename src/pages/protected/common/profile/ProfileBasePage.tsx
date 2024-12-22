import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useAuth } from '@src/features/auth/AuthProvider';
import ProfilePhoto from '@src/pages/components/ProfilePhoto';
import { exitOutline, idCardOutline } from 'ionicons/icons';
import { PropsWithChildren } from 'react';
import { styled } from 'styled-components';

const BackgroundBanner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 20vh; /* Use viewport height instead of vw ratio */
  min-height: 200px; /* Increased minimum height */
  //background-color: #4a90e2;
  background-color: ${`var(--ion-color-primary)`};
  //background-image: ${`url('https://ionicframework.com/docs/assets/img/ica-slidebox-img-1.png')`};
  //background-size: cover;
  z-index: 0;
  overflow: hidden;

  @media (min-width: 300px) {
    height: 10vh; /* Slightly shorter on mobile devices */
    min-height: 250px;
  }

  @media (min-width: 768px) {
    height: 20vh; /* Slightly shorter on mobile devices */
    min-height: 300px;
  }

  @media (min-width: 1000px) {
    height: 20vh; /* Slightly shorter on mobile devices */
    min-height: 200px;
  }

  @media (min-width: 1024px) {
    height: 10vh; /* Taller on larger screens */
    min-height: 300px;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2));
  }
`;

interface ProfileBasePageProps extends PropsWithChildren {
  title: string;
  showSignoutButton?: boolean;
}

const ProfileBasePage: React.FC<ProfileBasePageProps> = ({
  title,
  showSignoutButton = true,
  children,
}) => {
  const { signout } = useAuth();

  return (
    <IonPage>
      <IonHeader className='ion-no-border'>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton defaultHref={'/'} />
          </IonButtons>
          <IonTitle>{title}</IonTitle>
          <IonButtons slot='end'>
            {showSignoutButton && (
              <IonButton onClick={signout}>
                <IonIcon slot='icon-only' icon={exitOutline}></IonIcon>
              </IonButton>
            )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>{children}</IonContent>
    </IonPage>
  );
};

export default ProfileBasePage;
