import { OperatingHours } from '@src/domain';
import { Service } from '@src/domain/entities/service';
import { v4 as uuidv4 } from 'uuid';

const defaultOperatingHours: OperatingHours[] = [
  {
    day: 'Monday',
    isClosed: false,
    openAt: '09:00',
    closeAt: '18:00',
  },
  {
    day: 'Tuesday',
    isClosed: false,
    openAt: '09:00',
    closeAt: '18:00',
  },
  {
    day: 'Wednesday',
    isClosed: false,
    openAt: '09:00',
    closeAt: '18:00',
  },
  {
    day: 'Thursday',
    isClosed: false,
    openAt: '09:00',
    closeAt: '18:00',
  },
  {
    day: 'Friday',
    isClosed: false,
    openAt: '09:00',
    closeAt: '18:00',
  },
  {
    day: 'Saturday',
    isClosed: false,
    openAt: '10:00',
    closeAt: '16:00',
  },
  {
    day: 'Sunday',
    isClosed: true,
    openAt: '',
    closeAt: '',
  },
];

const defaultServices: Service[] = [
  {
    id: uuidv4(),
    name: 'Wash and Dry (max 8 kilos)',
    description: 'For everyday laundry, including bedsheets and towels',
    price: 75.0,
    maxQuantity: 5,
    maxWeightKG: 8,
    sequence: 1,
    tags: ['Wash', 'Tumble Dry', 'In a Bag', 'Folded'],
  },
  {
    id: uuidv4(),
    name: 'Wash and Iron (max 8 kilos)',
    description: '',
    price: 75,
    maxQuantity: 5,
    maxWeightKG: 8,
    sequence: 2,
    tags: ['Wash', 'Tumble Dry', 'In a Bag', 'Ironed'],
  },
  {
    id: uuidv4(),
    name: 'Iron Only (max 8 kilos)',
    description: '',
    price: 30,
    maxQuantity: 3,
    maxWeightKG: 8,
    sequence: 3,
    tags: ['Ironed', 'In a Bag'],
  },
  {
    id: uuidv4(),
    name: 'Dry Cleaning',
    description: '',
    price: 30,
    maxQuantity: 1,
    maxWeightKG: 8,
    sequence: 4,
    tags: ['Dry Cleaned', 'In a Bag'],
  },
  {
    id: uuidv4(),
    name: 'Ironing',
    description: '',
    price: 30,
    maxQuantity: 1,
    maxWeightKG: 8,
    sequence: 5,
    tags: ['Ironed', 'In a Bag'],
  },
  {
    id: uuidv4(),
    name: 'Stain Removal',
    description: '',
    price: 30,
    maxQuantity: 1,
    maxWeightKG: 8,
    sequence: 6,
    tags: ['In a Bag'],
  },
];

export { defaultOperatingHours, defaultServices };
