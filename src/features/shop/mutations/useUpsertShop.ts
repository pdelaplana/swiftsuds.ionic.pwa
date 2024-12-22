import { Address, Shop } from '@src/domain';
import { db } from '@src/infrastructure/firebase/firebase.config';
import { useMutation } from '@tanstack/react-query';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';

type UpsertShopData = {
  id?: string;
  name: string;
  description: string;
  logoUrl: string;
  website: string;
  phone: string;
  email: string;
  address: Address;
};

const useUpsertShop = () => {
  const insertShop = async (data: Shop) => {
    const docRef = await addDoc(collection(db, 'shops'), {
      ...(data as Omit<Shop, 'id'>),
      timestamp: new Date(),
    });
    const docSnapshot = await getDoc(docRef);
    return {
      ...(docSnapshot.data() as Omit<Shop, 'id'>),
      id: docSnapshot.id,
    };
  };

  const updateShop = async (data: Shop) => {
    // Step 1: Get the reference to the document by ID
    const docRef = doc(db, 'shops', data.id!);

    // Step 2: Get the current document data
    const docSnapshot = await getDoc(docRef);
    if (!docSnapshot.exists()) {
      throw new Error('Document does not exist.');
    }

    // Step 3: Update the Firestore document
    await updateDoc(docRef, {
      ...(docSnapshot.data() as Shop),
      ...(data as Omit<Shop, 'id'>),
    });

    // Step 4: Get the updated document data
    const updatedDocSnapshot = await getDoc(docRef);

    return {
      ...(updatedDocSnapshot.data() as Omit<Shop, 'id'>),
      id: updatedDocSnapshot.id,
    };
  };

  return useMutation({
    mutationFn: async (data: Shop) => {
      try {
        if (data.id) {
          return await updateShop(data);
        } else {
          return await insertShop(data);
        }
      } catch (error) {
        throw new Error('Error adding document: ' + error);
      }
    },
    onSuccess: (data) => {
      console.log('Document written with ID: ', data.id);
    },
    onError: (error: unknown) => {
      console.error('Error adding document: ', error);
    },
  });
};

export default useUpsertShop;
