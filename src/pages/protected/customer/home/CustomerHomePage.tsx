import {
  IonLabel,
  IonAvatar,
  IonCard,
  IonCardContent,
  IonIcon,
} from '@ionic/react';
import { homeOutline } from 'ionicons/icons';
import CustomerPage from '../CustomerPage';
import { useAuth } from '@src/features/auth/AuthProvider';
import { styled } from 'styled-components';

const StyledProfileSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const CustomeHomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <CustomerPage>
      <StyledProfileSection>
        <IonLabel color='dark'>
          <h1>
            Welcome back, <br /> {user?.displayName?.split(' ')[0]}
          </h1>
        </IonLabel>
        <IonAvatar>
          <img
            alt=''
            src='https://ionicframework.com/docs/img/demos/avatar.svg'
          />
        </IonAvatar>
      </StyledProfileSection>

      <IonCard button color='tertiary' hidden>
        <IonCardContent>
          <div
            style={{ display: 'flex', alignItems: 'center', padding: '5px' }}
          >
            <IonIcon
              src={homeOutline}
              size='large'
              style={{ marginRight: '10px' }}
            ></IonIcon>
            <IonLabel>
              <h3>Your Location</h3>
              <h2>184 Mindanao Ave, General Mariano Alvarez, Cavite, 4117</h2>
            </IonLabel>
          </div>
        </IonCardContent>
      </IonCard>
    </CustomerPage>
  );
};

export default CustomeHomePage;
