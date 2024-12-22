import {
  IonPage,
  IonContent,
  IonButton,
  IonRouterLink,
  IonText,
} from '@ionic/react';
import CenteredContainer from '@pages/components/layouts/CenteredContainer';
import MainLogo from '@pages/components/MainLogo';

const LandingPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <CenteredContainer>
          <MainLogo />
          <IonText className='ion-text-center'>
            <h1>Get Started - Its Free! No Credit Card Required</h1>
          </IonText>

          <IonButton expand='block' fill='solid' href='/signup'>
            Create Your Account
          </IonButton>

          <IonText className='ion-text-center'>
            <p>
              Already have an account?{' '}
              <IonRouterLink href='/signin'>Sign in</IonRouterLink>
            </p>
          </IonText>
        </CenteredContainer>
      </IonContent>
    </IonPage>
  );
};

export default LandingPage;
