import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { Redirect, Route, Switch } from 'react-router';
import CustomerHomePage from './home/CustomerHomePage';
import ProtectedRoute from '@src/pages/components/routing/ProtectedRoute';
import {
  triangle,
  ellipse,
  person,
  homeOutline,
  settingsOutline,
  personOutline,
} from 'ionicons/icons';
import ProfilePage from '../common/profile/ProfileBasePage';

interface ICustomerRoutesProps {}

const CustomerRoutes: React.FC<ICustomerRoutesProps> = ({}) => {
  const TabRoutes = () => {
    return (
      <IonTabs>
        <IonRouterOutlet>
          <Route path='/' exact>
            <CustomerHomePage />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot='bottom'>
          <IonTabButton tab='tab1' href='/'>
            <IonIcon aria-hidden='true' icon={homeOutline} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab='tab2' href='/tab2'>
            <IonIcon aria-hidden='true' icon={ellipse} />
            <IonLabel>Tab 2</IonLabel>
          </IonTabButton>
          <IonTabButton tab='tab3' href='/profile'>
            <IonIcon aria-hidden='true' icon={personOutline} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    );
  };

  return (
    <>
      <Switch>
        {/* Non tab routes */}

        {/* Tab routes */}
        <Route path='/'>
          <TabRoutes />
        </Route>
      </Switch>
    </>
  );
};

export default CustomerRoutes;
