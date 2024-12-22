import { IonList, IonItem, IonInput, IonLabel } from '@ionic/react';
import ProfileBasePage from './ProfileBasePage';
import { useAuth } from '@src/features/auth/AuthProvider';
import { useEffect, useState } from 'react';
import { ContentSection } from '@src/pages/components/layouts';
import { useInAppNotifications } from '@src/pages/components/hooks/useInAppNotifications';
import NiceButton from '@src/pages/components/ui/NiceButton';

const ProfileInfoPage: React.FC = () => {
  const { user, pendingUpdate, updateDisplayName, updateEmail } = useAuth();

  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { showNotification } = useInAppNotifications();

  const [profileValues, setProfileValues] = useState<{
    displayName: string;
    email: string;
    phoneNumber: string | null;
  }>({
    displayName: user?.displayName ?? '',
    email: user?.email ?? '',
    phoneNumber: user?.phoneNumber ?? null,
  });

  const handleInputChange = (e: CustomEvent, field: string) => {
    setProfileValues({
      ...profileValues,
      [field]: e.detail.value,
    });
  };

  const handleSave = () => {
    if (isDirty) {
      setIsSaving(true);
      if (profileValues.displayName !== user?.displayName) {
        updateDisplayName(profileValues.displayName);
      }
      if (profileValues.email !== user?.email) {
        updateEmail(profileValues.email);
      }
      showNotification('Profile updated successfully');
      setIsSaving(false);
    }
  };

  useEffect(() => {
    setIsDirty(
      profileValues.displayName !== user?.displayName ||
        profileValues.email !== user?.email ||
        profileValues.phoneNumber !== user?.phoneNumber
    );
  }, [profileValues, user]);

  useEffect(() => {
    setIsSaving(pendingUpdate);
  }, [pendingUpdate]);

  return (
    <ProfileBasePage title='Personal Info' showSignoutButton={false}>
      <ContentSection>
        <IonList>
          <IonItem lines='full'>
            <IonLabel>
              <IonInput
                label='Display Name'
                labelPlacement='floating'
                placeholder='Display Name'
                type='text'
                value={profileValues.displayName}
                onIonChange={(e: CustomEvent) =>
                  handleInputChange(e, 'displayName')
                }
                required
              />
            </IonLabel>
          </IonItem>
          <IonItem lines='full'>
            <IonLabel>
              <IonInput
                label='Email'
                labelPlacement='floating'
                placeholder='Email'
                type='text'
                value={profileValues.email}
                required
                disabled
                onIonChange={(e: CustomEvent) => handleInputChange(e, 'email')}
              />
            </IonLabel>
          </IonItem>
          <IonItem lines='full'>
            <IonLabel>
              <IonInput
                label='Phone'
                labelPlacement='floating'
                placeholder='Phone'
                type='text'
                disabled
                value={profileValues.phoneNumber}
                required
              />
            </IonLabel>
          </IonItem>
        </IonList>
        <NiceButton
          expand='block'
          onClick={handleSave}
          className='ion-margin'
          isLoading={isSaving}
          isDisabled={!isDirty}
        >
          Save Changes
        </NiceButton>
      </ContentSection>
    </ProfileBasePage>
  );
};

export default ProfileInfoPage;
