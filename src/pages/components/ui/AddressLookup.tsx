import React, { useEffect, useState } from 'react';
import {
  IonInput,
  IonList,
  IonItem,
  IonSearchbar,
  IonToolbar,
} from '@ionic/react';
import { Address } from '@src/domain';
import { ContentSection } from '../layouts';

const API_KEY = `${import.meta.env.VITE_GOOGLE_API_KEY}`;

const AddressLookup = ({
  onSelectAddress,
  onSearching,
}: {
  onSelectAddress: (address: any) => void;
  onSearching: (isSearching: boolean) => void;
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const parseAddressComponents = (addressComponents: any[]) => {
    const result: { [key: string]: string } = {};

    addressComponents.forEach((component) => {
      component.types.forEach((type: string) => {
        result[type] = component.longText;
      });
      return result;
    });

    return {
      streetAddress1: `${result.street_number || ''}  ${result.route || ''}`,
      streetAddress2: result.subpremise || '',
      cityOrSuburb: result.locality || '',
      stateOrProvince: result.administrative_area_level_1 || '',
      postCode: result.postal_code || '',
    } as Address;
  };
  const fetchAddressDetails = async (placeId: string) => {
    const endpoint = `https://places.googleapis.com/v1/places/${placeId}?key=${API_KEY}`;

    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': API_KEY,
          'X-Goog-FieldMask':
            'id,displayName,formattedAddress,addressComponents',
        },
      });

      if (!response.ok) {
        throw new Error(
          `Error fetching address details: ${response.statusText}`
        );
      }

      const data = await response.json();
      return data; // Contains detailed information about the place
    } catch (error) {
      console.error('Error fetching address details:', error);
      return null;
    }
  };

  const fetchSuggestions = async (input: string) => {
    if (!input) {
      setSuggestions([]);
      return;
    }
    const endpoint = `https://places.googleapis.com/v1/places:autocomplete`;
    try {
      setIsSearching(true);
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': API_KEY,
        },
        body: JSON.stringify({
          input,
        }),
      });
      if (!response.ok) {
        throw new Error(`Error fetching suggestions: ${response.statusText}`);
      }
      const data = await response.json();
      setSuggestions(data.suggestions);
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const handleInputChange = (e: CustomEvent) => {
    const value = e.detail.value!;
    setQuery(value);
    fetchSuggestions(value);
  };

  const handleSelect = (place: any) => {
    fetchAddressDetails(place.placePrediction.placeId).then((result) => {
      const address = parseAddressComponents(result.addressComponents);
      setQuery('');
      onSelectAddress(address); // Pass the selected address to the parent component
    });
    setSuggestions([]);
  };

  useEffect(() => {
    setIsSearching(query.length > 0);
  }, [query]);

  useEffect(() => {
    onSearching(isSearching);
  }, [isSearching]);

  return (
    <>
      <IonToolbar className='ion-no-margin ion-no-padding ion-padding-bottom ion-padding-top'>
        <IonSearchbar
          mode='md'
          placeholder='Select address'
          debounce={1000}
          onIonInput={handleInputChange}
          onIonCancel={() => setIsSearching(false)}
          onIonClear={() => setIsSearching(false)}
          value={query}
        ></IonSearchbar>
      </IonToolbar>
      {isSearching && (
        <ContentSection>
          <IonList lines='none'>
            {suggestions?.map((place) => (
              <IonItem
                key={place.placeId}
                lines='full'
                button
                onClick={() => handleSelect(place)}
              >
                {place.placePrediction.text.text}
              </IonItem>
            ))}
          </IonList>
        </ContentSection>
      )}
    </>
  );
};

export default AddressLookup;
