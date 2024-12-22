import { Address } from './address';
import { OperatingHours } from '../valueTypes/operatingHours';
import { Service } from './service';

export interface Shop {
  id: string;
  name: string;
  description: string;
  averageRating: number;
  totalRatingsCount: number;
  logoUrl: string;
  website: string;
  phone: string;
  email: string;
  operatingHours: OperatingHours[];
  address: Address;
  services: Service[];
}

export const shopValidationSchema = {
  name: {
    required: 'Shop name is required',
    minLength: {
      value: 3,
      message: 'Shop name must be at least 3 characters long',
    },
    maxLength: {
      value: 50,
      message: 'Shop name must be less than 50 characters',
    },
  },
  description: {
    maxLength: {
      value: 500,
      message: 'Description must be less than 500 characters',
    },
  },
  website: {
    pattern: {
      value: /^(http|https):\/\/[^ "]+$/,
      message: 'Enter a valid website URL',
    },
  },
  email: {
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: 'Enter a valid email address',
    },
  },
  /*
  phone: {
    pattern: {
      value: /^[0-9]{10}$/,
      message: 'Enter a valid phone number',
    },
  },
  */
};
