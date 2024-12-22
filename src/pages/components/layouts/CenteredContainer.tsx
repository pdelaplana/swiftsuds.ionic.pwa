import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { PropsWithChildren } from 'react';

interface ICenterContainerProps extends PropsWithChildren {
  height?: string;
}

const CenteredContainer: React.FC<ICenterContainerProps> = ({ children }) => {
  return (
    <IonGrid style={{ maxWidth: '1420px' }}>
      <IonRow>
        <IonCol></IonCol>
        <IonCol size='8' sizeSm='11' sizeXs='11' sizeLg='6' sizeXl='6'>
          {children}
        </IonCol>
        <IonCol></IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default CenteredContainer;
