import { Shop } from '@src/domain';
import { db } from '@src/infrastructure/firebase/firebase.config';
import { useQuery } from '@tanstack/react-query';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

const useFetchShop = (shopId: string) => {
  return useQuery({
    queryKey: ['shop'],
    queryFn: async () => {
      // Get reference to the collection
      const docRef = doc(db, 'shops', shopId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        return { ...docSnap.data(), id: docSnap.id } as Shop;
      } else {
        console.log('No such document!');
        return null;
      }
    },
  });
};

export default useFetchShop;
