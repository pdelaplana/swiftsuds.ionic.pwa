import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonLabel,
} from '@ionic/react';
import ShopPage from '../ShopPage';
import { styled } from 'styled-components';
import { useAuth } from '@src/features/auth/AuthProvider';
import { CenteredContainer } from '@src/pages/components/layouts';
import { homeOutline } from 'ionicons/icons';
import ProfilePhoto from '@src/pages/components/ProfilePhoto';

const StyledSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  margin: 20px;
`;

const ShopHomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <ShopPage>
      <StyledSection>
        <IonLabel color='dark'>
          <h1>
            Welcome back, <br /> {user?.displayName?.split(' ')[0]}
          </h1>
        </IonLabel>
        <ProfilePhoto
          photoUrl={user?.photoURL!}
          name={user?.displayName || 'User'}
          style={{ width: '8rem', height: '8rem' }}
          editable={false}
        />
      </StyledSection>
    </ShopPage>
  );
};

export default ShopHomePage;
