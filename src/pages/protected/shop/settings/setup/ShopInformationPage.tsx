import { Address } from '@src/domain';
import ShopPage from '../../ShopPage';
import ShopInformationForm from './components/ShopInformationForm';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useShop } from '@src/features/shop/ShopProvider';
import NiceButton from '@src/pages/components/ui/NiceButton';
import { useEffect } from 'react';
import { useInAppNotifications } from '@src/pages/components/hooks/useInAppNotifications';

interface ShopInformationEditPageProps {}

interface ShopInformationEditForm {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  website: string;
  phone: string;
  email: string;
  address: Address;
}

const ShopInformationPage: React.FC<ShopInformationEditPageProps> = ({}) => {
  const { shop, upsertAsync, status } = useShop();

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
    reset,
  } = useForm<ShopInformationEditForm>({
    defaultValues: {
      id: shop?.id ?? '',
      name: shop?.name ?? '',
      description: shop?.description ?? '',
      logoUrl: shop?.logoUrl ?? '',
      website: shop?.website ?? '',
      phone: shop?.phone ?? '',
      email: shop?.email ?? '',
      address: {
        streetAddress1: '',
        streetAddress2: '',
        cityOrSuburb: '',
      },
    },
  });

  const { showNotification } = useInAppNotifications();

  const onSubmit: SubmitHandler<ShopInformationEditForm> = async (formData) => {
    upsertAsync({
      ...shop!,
      name: formData.name,
      description: formData.description,
      logoUrl: formData.logoUrl,
      website: formData.website,
      phone: formData.phone,
      email: formData.email,
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
      title='Edit Shop Information'
      defaultBackButtonHref='/settings/shop'
      showProfileIcon={false}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <ShopInformationForm
          register={register}
          errors={errors}
          setValue={setValue}
        />
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
    </ShopPage>
  );
};

export default ShopInformationPage;
