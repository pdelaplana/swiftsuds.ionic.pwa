import ProtectedRoute from '@src/pages/components/routing/ProtectedRoute';
import ShopSettingsPage from './ShopSettingsPage';
import { IonRouterOutlet } from '@ionic/react';
import ShopInformationPage from './setup/ShopInformationPage';
import { ShopProvider } from '@src/features/shop/ShopProvider';
import { useAuth } from '@src/features/auth/AuthProvider';
import ShopAddressPage from './setup/ShopAddressPage';
import ShopServicesPage from './setup/shopServices/ShopServicesPage';
import ShopHoursPage from './setup/shopHours/ShopHoursPage';

const ShopSettingsRoutes: React.FC = () => {
  const { user } = useAuth();
  return (
    <ShopProvider shopId={user?.shopId!}>
      <IonRouterOutlet>
        <ProtectedRoute path='/settings/shop/info' exact>
          <ShopInformationPage />
        </ProtectedRoute>
        <ProtectedRoute path='/settings/shop/address' exact>
          <ShopAddressPage />
        </ProtectedRoute>
        <ProtectedRoute path='/settings/shop/services' exact>
          <ShopServicesPage />
        </ProtectedRoute>
        <ProtectedRoute path='/settings/shop/hours' exact>
          <ShopHoursPage />
        </ProtectedRoute>
        <ProtectedRoute path='/settings/shop' exact>
          <ShopSettingsPage />
        </ProtectedRoute>
      </IonRouterOutlet>
    </ShopProvider>
  );
};

export default ShopSettingsRoutes;
