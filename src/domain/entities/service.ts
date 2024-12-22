export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  maxQuantity: number;
  maxWeightKG?: number;
  tags: string[];
  sequence: number;
}
