import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonRouterLink,
  IonText,
  useIonRouter,
  useIonToast,
} from '@ionic/react';
import { Address, Shop } from '@src/domain';
import { SubmitHandler, useForm } from 'react-hook-form';
import ShopInformationForm from '../common/ShopInformationForm';
import useUpsertShop from '@src/features/shop/mutations/useUpsertShop';
import { useEffect, useState } from 'react';
import { useAuth } from '@src/features/auth/AuthProvider';
import {
  defaultOperatingHours,
  defaultServices,
} from '@src/features/shop/defaultValues';

interface ShopOnboardingPageForm {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  website: string;
  phone: string;
  email: string;
  address: Address;
}

const ShopOnboardingPage: React.FC = () => {
  const [shop, setShop] = useState<Shop>();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ShopOnboardingPageForm>();

  const { setProfileData } = useAuth();

  const {
    mutateAsync: upsertShopAsync,
    error,
    isSuccess,
    isError,
    isPending,
  } = useUpsertShop();

  const router = useIonRouter();
  const [present] = useIonToast();

  const onSubmit: SubmitHandler<ShopOnboardingPageForm> = async (formData) => {
    const shop = await upsertShopAsync({
      id: '',
      name: formData.name,
      description: formData.description,
      website: formData.website,
      phone: formData.phone,
      email: formData.email,
      logoUrl: '',
      averageRating: 0,
      totalRatingsCount: 0,
      address: {
        streetAddress1: '',
        streetAddress2: '',
        cityOrSuburb: '',
        stateOrProvince: '',
        postCode: '',
      },
      operatingHours: defaultOperatingHours,
      services: defaultServices,
    });
    console.debug('Shop created:', shop);
    setProfileData({ key: 'shopId', value: shop.id });
  };

  useEffect(() => {
    if (isSuccess) {
      present({
        position: 'top',
        message: 'Shop created successfully!',
        duration: 2000,
        color: 'success',
      });
      router.push('/home', 'forward', 'replace');
    }
    if (isError) {
      present({
        position: 'top',
        message: 'Failed to create shop',
        duration: 2000,
        color: 'danger',
      });
    }
  }, [isSuccess, isError, shop]);

  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent>
        <div className='ion-margin'>
          <h1 color='primary'>Set up your Laundry Shop in Minutes</h1>
          <p color='medium'>
            We just need a few details to help you get started. You can edit
            these details later in your shop settings.
          </p>
        </div>

        <form id='onboarding-form' onSubmit={handleSubmit(onSubmit)}>
          <ShopInformationForm register={register} errors={errors} />
        </form>

        <div className='ion-padding'>
          <IonText color='medium'>
            <small className='ion-margin-bottom'>
              By continuing, you agree to our{' '}
              <IonRouterLink> Terms of Service</IonRouterLink> and{' '}
              <IonRouterLink> Privacy Policy</IonRouterLink>.
            </small>
          </IonText>
          <IonButton
            expand='full'
            type='submit'
            size='default'
            form='onboarding-form'
            className='ion-margin-top'
            disabled={isPending}
          >
            Continue
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ShopOnboardingPage;
