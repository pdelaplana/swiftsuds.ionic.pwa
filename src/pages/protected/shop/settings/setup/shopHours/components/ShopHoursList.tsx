import { IonList, IonItem, IonLabel } from '@ionic/react';
import { OperatingHours } from '@src/domain';
import { useShop } from '@src/features/shop';
import { ellipsisVerticalOutline } from 'ionicons/icons';

interface ShopHoursListProps {
  onSelectHours: (operatingHours: OperatingHours) => Promise<void>;
}

const ShopHoursList: React.FC<ShopHoursListProps> = ({ onSelectHours }) => {
  const { shop } = useShop();

  return (
    <IonList lines='none' className='ion-margin-top'>
      {shop?.operatingHours?.map((hours) => (
        <IonItem
          key={hours.day}
          lines='full'
          button
          detail
          detailIcon={ellipsisVerticalOutline}
          onClick={async () => onSelectHours(hours)}
        >
          <IonLabel>
            <h2>{hours.day}</h2>
            <p>
              {hours.openAt} to {hours.closeAt}
            </p>
          </IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
};
export default ShopHoursList;
