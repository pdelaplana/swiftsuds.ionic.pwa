import { IonItem, IonLabel, IonList } from '@ionic/react';
import { Service } from '@src/domain/entities/service';
import { useShop } from '@src/features/shop';
import { ellipsisVerticalOutline } from 'ionicons/icons';

interface ShopServicesListProps {
  onSelectService: (service: Service) => Promise<void>;
}

const ShopServicesList: React.FC<ShopServicesListProps> = ({
  onSelectService,
}) => {
  const { shop } = useShop();

  return (
    <IonList lines='none' className='ion-margin-top'>
      {shop?.services?.map((service) => (
        <IonItem
          key={service.id}
          lines='full'
          button
          detail
          detailIcon={ellipsisVerticalOutline}
          onClick={async () => onSelectService(service)}
        >
          <IonLabel>
            <h2>{service.name}</h2>
            <p>{service.description}</p>
          </IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
};
export default ShopServicesList;
