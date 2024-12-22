import ShopPage from '../../ShopPage';
import ShopAddressForm from '../../common/ShopAddressForm';
import { Address } from '@src/domain';
import { useShop } from '@src/features/shop/ShopProvider';
import { SubmitHandler, useForm } from 'react-hook-form';
import AddressLookup from '@src/pages/components/ui/AddressLookup';
import { useEffect, useState } from 'react';
import NiceButton from '@src/pages/components/ui/NiceButton';
import { useInAppNotifications } from '@src/pages/components/hooks/useInAppNotifications';

interface ShopAddressForm {
  id: string;

  address: Address;
}

const ShopAddressPage: React.FC = () => {
  const { shop, upsertAsync, status } = useShop();
  const [isSearching, setIsSearching] = useState(false);

  const { showNotification } = useInAppNotifications();

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
    reset,
  } = useForm<ShopAddressForm>({
    defaultValues: {
      id: shop?.id ?? '',
      address: {
        streetAddress1: shop?.address.streetAddress1 ?? '',
        streetAddress2: shop?.address.streetAddress2 ?? '',
        cityOrSuburb: shop?.address.cityOrSuburb ?? '',
        stateOrProvince: shop?.address.stateOrProvince ?? '',
        postCode: shop?.address.postCode ?? '',
      },
    },
  });

  const handleAddressSelect = async (address: Address) => {
    setValue('address', address, { shouldDirty: true, shouldValidate: true });
  };

  const onSubmit: SubmitHandler<ShopAddressForm> = async (formData) => {
    console.log('Form submitted:', formData);
    upsertAsync({
      ...shop!,
      address: {
        ...formData.address,
      },
    });
  };

  useEffect(() => {
    if (status === 'success') {
      showNotification('Shop updated successfully');
    } else if (status === 'error') {
      showNotification('Failed to update shop');
    }
  }, [status]);

  useEffect(() => {
    reset(shop);
  }, [shop]);

  return (
    <ShopPage
      title='Address'
      defaultBackButtonHref='/settings/shop'
      showProfileIcon={false}
    >
      <AddressLookup
        onSelectAddress={handleAddressSelect}
        onSearching={(isSearching) => setIsSearching(isSearching)}
      />

      {!isSearching && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <ShopAddressForm register={register} setValue={setValue} />
          <NiceButton
            type='submit'
            color='primary'
            isLoading={status === 'pending'}
            isDisabled={!isDirty}
            className='ion-margin'
            expand='full'
          >
            Save
          </NiceButton>
        </form>
      )}
    </ShopPage>
  );
};

export default ShopAddressPage;
