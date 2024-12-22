import ShopPage from '@src/pages/protected/shop/ShopPage';
import ShopServicesList from './components/ShopServicesList';
import NiceButton from '@src/pages/components/ui/NiceButton';
import { useShopServiceFormModal } from './components/ShopServiceFormModal';
import { useShop } from '@src/features/shop';
import { Service } from '@src/domain/entities/service';

const ShopServicesPage: React.FC = () => {
  const { shop, upsertService, deleteService, getAllServiceTags } = useShop();

  const { open: openShopServiceFormModal } = useShopServiceFormModal();

  const handleOpenShopServiceFormModal = async (selected?: Service) => {
    const { updated, role } = await openShopServiceFormModal(
      {
        name: selected?.name || '',
        description: selected?.description || '',
        price: selected?.price || 0,
        maxQuantity: selected?.maxQuantity || 0,
        maxWeightKG: selected?.maxWeightKG || 0,
        sequence: selected?.sequence || 0,
        tags: selected?.tags || [],
        id: selected?.id || '',
      },
      getAllServiceTags()
    );

    if (shop) {
      if (role === 'confirm') {
        upsertService(updated);
      } else if (role === 'delete') {
        deleteService(updated);
      }
    }
  };

  return (
    <ShopPage
      title='Services'
      defaultBackButtonHref='/settings/shop'
      showProfileIcon={false}
    >
      <ShopServicesList onSelectService={handleOpenShopServiceFormModal} />
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
export default ShopServicesPage;
