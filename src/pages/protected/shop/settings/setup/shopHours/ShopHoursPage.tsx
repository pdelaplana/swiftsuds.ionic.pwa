import { OperatingHours } from '@src/domain';
import ShopPage from '../../../ShopPage';
import ShopHoursList from './components/ShopHoursList';
import NiceButton from '@src/pages/components/ui/NiceButton';
import { useShopHoursFormModal } from './components/ShopHoursFormModal';
import { useShop } from '@src/features/shop';

const ShopHoursPage: React.FC = () => {
  const { shop, upsertOperatingHours, deleteOperatingHours } = useShop();
  const { open: openShopHoursFormModal } = useShopHoursFormModal();

  const handleOpenShopServiceFormModal = async (selected?: OperatingHours) => {
    const { updated, role } = await openShopHoursFormModal(selected);
    if (shop) {
      if (role === 'confirm') {
        upsertOperatingHours(updated);
      } else if (role === 'delete') {
        deleteOperatingHours(updated);
      }
    }
  };

  return (
    <ShopPage
      title='Operating Hours'
      defaultBackButtonHref='/settings/shop'
      showProfileIcon={false}
    >
      <ShopHoursList onSelectHours={handleOpenShopServiceFormModal} />
      <NiceButton
        onClick={handleOpenShopServiceFormModal}
        expand='full'
        color='primary'
        isLoading={false}
        isDisabled={false}
        className='ion-margin'
      >
        Add
      </NiceButton>
    </ShopPage>
  );
};
export default ShopHoursPage;
