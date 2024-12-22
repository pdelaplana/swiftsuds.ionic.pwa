import { OperatingHours, Shop } from '@src/domain';
import { createContext, ReactNode, useContext } from 'react';
import useUpsertShopMutation from './mutations/useUpsertShop';
import useFetchShop from './queries/useFetchShop';
import { Service } from '@src/domain/entities/service';

type ShopContextType = {
  shop?: Shop;
  isLoading: boolean;
  updatePending: boolean;
  status: 'idle' | 'loading' | 'pending' | 'success' | 'error';
  upsertAsync: (shop: Shop) => void;
  upsertService: (service: Service) => void;
  deleteService: (service: Service) => void;
  getAllServiceTags: () => string[];
  upsertOperatingHours: (operatingHours: OperatingHours) => void;
  deleteOperatingHours: (operatingHours: OperatingHours) => void;
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{
  shopId: string;
  children: ReactNode;
}> = ({ shopId, children }) => {
  const { data: shop, isLoading, refetch } = useFetchShop(shopId);

  const {
    mutateAsync: upsertShopAsync,
    error,
    isPending,
    isSuccess,
    status,
    reset,
  } = useUpsertShopMutation();

  const upsertAsync = async (shop: Shop) => {
    await upsertShopAsync(shop);
    refetch();
    setTimeout(() => {
      // reset the status after 1 second
      reset();
    }, 1000);
  };

  const upsertService = async (service: Service) => {
    await upsertAsync({
      ...shop!,
      services: !shop?.services
        ? [service]
        : shop.services.some((s) => s.id === service.id)
          ? shop.services.map((s) => (s.id === service.id ? service : s))
          : [...shop.services, service],
    });
  };

  const deleteService = async (service: Service) => {
    await upsertAsync({
      ...shop!,
      services: shop!.services?.filter((s) => s.id !== service.id),
    });
  };

  const getAllServiceTags = () => {
    const tags = shop?.services?.reduce((acc, service) => {
      return [...acc, ...service.tags];
    }, [] as string[]);
    return Array.from(new Set(tags));
  };

  const upsertOperatingHours = async (operatingHours: OperatingHours) => {
    await upsertAsync({
      ...shop!,
      operatingHours: !shop?.operatingHours
        ? [operatingHours]
        : shop.operatingHours.some((s) => s.day === operatingHours.day)
          ? shop.operatingHours.map((s) =>
              s.day === operatingHours.day ? operatingHours : s
            )
          : [...shop.operatingHours, operatingHours],
    });
  };

  const deleteOperatingHours = async (operatingHours: OperatingHours) => {
    await upsertAsync({
      ...shop!,
      operatingHours: shop!.operatingHours?.filter(
        (s) => s.day !== operatingHours.day
      ),
    });
  };

  return (
    <ShopContext.Provider
      value={{
        shop: shop ?? undefined,
        isLoading,
        updatePending: isPending,
        status: isLoading ? 'loading' : status,
        upsertAsync,
        upsertService,
        deleteService,
        getAllServiceTags,
        upsertOperatingHours,
        deleteOperatingHours,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = (): ShopContextType => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
