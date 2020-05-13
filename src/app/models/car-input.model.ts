import { Specs } from './car.model';

export interface CarInput {
  year: number;
  make: string;
  model: string;
  country: string;
  styling: number;
  acceleration: number;
  handling: number;
  fun_factor: number;
  cool_factor: number;
  features: number;
  comfort: number;
  quality: number;
  practicality: number;
  value: number;
  description?: string;
  specs?: Specs;
  image?: string;
}
