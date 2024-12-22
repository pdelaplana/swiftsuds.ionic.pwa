import { IonLabel, IonList, IonItem, IonIcon } from '@ionic/react';
import ProfilePhoto from '@src/pages/components/ProfilePhoto';
import { idCardOutline } from 'ionicons/icons';
import ProfileBasePage from './ProfileBasePage';
import { useAuth } from '@src/features/auth/AuthProvider';
import { ContentSection, Gap } from '@src/pages/components/layouts';

const ProfilePage: React.FC = () => {
  const { user, signout, updatePhotoUrl } = useAuth();
  return (
    <ProfileBasePage title='Profile'>
      <ContentSection marginTop={10}>
        <div className='ion-padding ion-flex ion-justify-content-center'>
          <ProfilePhoto
            name={`${user?.displayName}`}
            photoUrl={user?.photoURL ?? ''}
            updatePhotoUrl={updatePhotoUrl}
            storagePath={`users/${user?.uid}/profile`}
          />
        </div>
        <IonLabel className='ion-text-center'>
          <h1 className='dark'>{user?.displayName}</h1>
        </IonLabel>
        <IonLabel className='ion-text-center'>
          <h2>{user?.email}</h2>
        </IonLabel>
      </ContentSection>

      <ContentSection marginTop={50}>
        <IonList lines='none' className='ion-margin-top'>
          <IonItem
            lines='full'
            detail
            button
            routerLink='/profile/info'
            className='ion-border-top'
          >
            <IonIcon slot='start' icon={idCardOutline}></IonIcon>
            <IonLabel>
              <h2>Personal Info</h2>
              <p>Update your phone and email</p>
            </IonLabel>
          </IonItem>
        </IonList>
      </ContentSection>
    </ProfileBasePage>
  );
};

export default ProfilePage;
