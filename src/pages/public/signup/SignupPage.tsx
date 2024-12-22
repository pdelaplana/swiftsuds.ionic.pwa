import {
  IonContent,
  IonPage,
  useIonRouter,
  useIonToast,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonRouterLink,
  IonListHeader,
  IonText,
} from '@ionic/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { CenteredContainer } from '@pages/components/layouts';
import { useAuth } from '@features/auth/AuthProvider';
import MainLogo from '@src/pages/components/MainLogo';
import ValidationError from '@src/pages/components/form/ValidationError';

interface ISignupForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const validationRules = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Updated regex for valid email addresses
      message: 'Enter a valid email address',
    },
  },
  name: {
    required: 'Name is required',
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 6,
      message: 'Password must be at least 6 characters long',
    },
  },
  confirmPassword: (password: string) => ({
    required: 'Please confirm your password',
    validate: (value: string) => value === password || 'Passwords do not match',
  }),
};

interface SignupPageProps {
  role: 'customer' | 'shopStaff' | 'courier';
}

const SignupPage: React.FC<SignupPageProps> = ({ role }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ISignupForm>();

  const { signup, setProfileData } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [present] = useIonToast();

  const router = useIonRouter();

  const onSubmit: SubmitHandler<ISignupForm> = async (formData) => {
    const creds = await signup(
      formData.email,
      formData.password,
      formData.name
    );

    if (creds?.user) {
      setProfileData({ key: 'role', value: role, uid: creds.user.uid });
      present({
        position: 'top',
        message: 'Sign up successful!',
        duration: 2000,
        color: 'success',
      });
      router.push('/home', 'forward', 'replace');
    }
  };

  // Watch password for confirmation validation
  const password = watch('password');

  return (
    <IonPage>
      <IonContent fullscreen>
        <CenteredContainer>
          <MainLogo />
        </CenteredContainer>
        <CenteredContainer>
          <form onSubmit={handleSubmit(onSubmit)}>
            <IonList lines='none'>
              <IonListHeader>
                <IonText>
                  <h1>Sign up</h1>
                </IonText>
              </IonListHeader>
              <IonItem>
                <IonLabel>
                  Let’s create or find your account. We’ll send a security code
                  to verify that it’s really you.
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <IonInput
                    placeholder='Name'
                    label='Name'
                    labelPlacement='floating'
                    fill='outline'
                    {...register('name', validationRules.name)}
                  />
                  <ValidationError error={errors.name} />
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <IonInput
                    placeholder='Email'
                    label='Email'
                    labelPlacement='floating'
                    fill='outline'
                    {...register('email', validationRules.email)}
                  />
                  <ValidationError error={errors.email} />
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <IonInput
                    placeholder='Password'
                    label='Password'
                    labelPlacement='floating'
                    fill='outline'
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', validationRules.password)}
                  />
                  <ValidationError error={errors.password} />
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <IonInput
                    placeholder='Confirm Password'
                    label='Confirm Password'
                    labelPlacement='floating'
                    fill='outline'
                    type={showPassword ? 'text' : 'password'}
                    {...register(
                      'confirmPassword',
                      validationRules.confirmPassword(password)
                    )}
                  />
                  <ValidationError error={errors.confirmPassword} />
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <IonButton
                    size='default'
                    expand='block'
                    type='submit'
                    disabled={loading}
                    className='ion-padding-top ion-padding-bottom'
                  >
                    Sign up
                  </IonButton>
                </IonLabel>
              </IonItem>

              <IonItem>
                <IonLabel className='ion-text-center'>
                  <IonRouterLink href='/signin'>
                    Have an account? Sign in here
                  </IonRouterLink>
                </IonLabel>
              </IonItem>
            </IonList>
          </form>
        </CenteredContainer>
      </IonContent>
    </IonPage>
  );
};

export default SignupPage;
