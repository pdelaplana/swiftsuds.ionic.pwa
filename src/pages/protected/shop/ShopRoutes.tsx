import ProtectedRoute from '@src/pages/components/routing/ProtectedRoute';
import React, { useEffect, useState } from 'react';
import { Switch } from 'react-router-dom';
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/react';
import {
  ellipsisHorizontalOutline,
  homeOutline,
  settingsOutline,
} from 'ionicons/icons';
import ShopHomePage from './home/ShopHomePage';
import ShopSettingsRoutes from './settings/ShopSettingsRoutes';
import ShopOnboardingPage from './onboarding/ShopOnboardingPage';
import { useAuth } from '@src/features/auth/AuthProvider';

interface ShopRoutesProps {}

interface ShopSetupState {
  isSetup: boolean | null;
  isLoading: boolean;
  error: Error | null;
}

const TabRoutes = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Switch>
          <ProtectedRoute path='/settings'>
            <ShopSettingsRoutes />
          </ProtectedRoute>
          <ProtectedRoute path='/home' exact>
            <ShopHomePage />
          </ProtectedRoute>
        </Switch>
      </IonRouterOutlet>
      <IonTabBar slot='bottom'>
        <IonTabButton tab='home' href='/home'>
          <IonIcon aria-hidden='true' icon={homeOutline} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>

        <IonTabButton tab='settings' href='/settings/shop'>
          <IonIcon aria-hidden='true' icon={ellipsisHorizontalOutline} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

const ShopRoutes: React.FC<ShopRoutesProps> = ({}) => {
  const [isShopSetup, setIsShopSetup] = useState<boolean | null>(null);

  const { isAuthenticated, authStateLoading, user } = useAuth();

  useEffect(() => {
    setIsShopSetup(user?.shopId !== undefined);
  }, [user]);

  /*
    if (setupState.isLoading) {
    return <IonSpinner />;
  }

  if (setupState.error) {
    return <ErrorDisplay error={setupState.error} />;
  }
  */

  if (!isShopSetup) {
    return <ShopOnboardingPage />;
  }

  return <TabRoutes />;
};

export default ShopRoutes;
