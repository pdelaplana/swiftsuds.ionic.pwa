import { IonLoading, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, Switch } from 'react-router';
import LandingPage from './pages/public/landing/LandingPage';
import SignupPage from '@pages/public/signup/SignupPage';

import SigninPage from './pages/public/signin/SigninPage';
import CustomerRoutes from './pages/protected/customer/CustomerRoutes';
import { useAuth } from './features/auth/AuthProvider';
import ShopRoutes from './pages/protected/shop/ShopRoutes';
import { useEffect, useState } from 'react';
import ProtectedRoute from './pages/components/routing/ProtectedRoute';
import ProfileRoutes from './pages/protected/common/profile/ProfileRoutes';

type Role = 'shopStaff' | 'customer' | 'courier' | undefined;

interface AuthState {
  isInitialized: boolean;
  isLoading: boolean;
  error: Error | null;
}

const AppRoutes: React.FC = () => {
  const { isAuthenticated, authStateLoading, user } = useAuth();
  const [authState, setAuthState] = useState<AuthState>({
    isInitialized: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (isAuthenticated) {
          console.debug('Fetched role:', user?.role);

          setAuthState({
            isInitialized: true,
            isLoading: false,
            error: null,
          });
        } else {
          setAuthState((prev) => ({
            ...prev,
            isInitialized: true,
            isLoading: false,
          }));
        }
      } catch (error) {
        console.error('Failed to get user role:', error);
        setAuthState((prev) => ({
          ...prev,
          error: error as Error,
          isLoading: false,
        }));
      }
    };

    if (!authStateLoading) {
      initializeAuth();
    }
  }, [isAuthenticated, authStateLoading, user]);

  const renderRoleBasedRoutes = () => {
    console.debug('Auth state:', authState);

    if (!isAuthenticated) {
      return <Redirect to='/signin' />;
    }
    switch (user?.role) {
      case 'shopStaff':
        console.debug('Rendering ShopRoutes');
        return <ShopRoutes />;
      case 'customer':
        return <CustomerRoutes />;
      case 'courier':
        return <Redirect to='/courier' />;
      default:
        console.warn('No valid role, redirecting to landing');
        return <Redirect to='/landing' />;
    }
  };

  if (authStateLoading || (!authState.isInitialized && authState.isLoading)) {
    return <IonLoading isOpen={authState.isLoading} message='Loading...' />;
  }

  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Switch>
          {/* Public routes */}
          <Route exact path='/landing' component={LandingPage} />
          <Route exact path='/signin' component={SigninPage} />

          <Route
            exact
            path='/shop/signup'
            render={() => <SignupPage role='shopStaff' />}
          />

          <Route exact path='/signup'>
            <Redirect to='/shop/signup' />
          </Route>

          {/* Protected routes */}
          <ProtectedRoute path='/profile'>
            <ProfileRoutes />
          </ProtectedRoute>

          {/* Role-based routing */}
          <Route path='/'>{renderRoleBasedRoutes()}</Route>
        </Switch>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default AppRoutes;
