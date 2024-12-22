import { IonRouterOutlet } from '@ionic/react';
import ProtectedRoute from '@src/pages/components/routing/ProtectedRoute';
import ProfilePage from './ProfilePage';
import ProfileInfoPage from './ProfileInfoPage';
import { Switch } from 'react-router';

const ProfileRoutes: React.FC = () => {
  return (
    <IonRouterOutlet>
      <Switch>
        <ProtectedRoute path='/profile/info' exact>
          <ProfileInfoPage />
        </ProtectedRoute>

        <ProtectedRoute path='/profile'>
          <ProfilePage />
        </ProtectedRoute>
      </Switch>
    </IonRouterOutlet>
  );
};

export default ProfileRoutes;
