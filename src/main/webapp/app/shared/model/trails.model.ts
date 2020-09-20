import { Moment } from 'moment';
import { IBookings } from 'app/shared/model/bookings.model';

export interface ITrails {
  id?: number;
  name?: string;
  startTime?: string;
  endTime?: string;
  ageLimit?: string;
  price?: string;
  bookings?: IBookings[];
}

export const defaultValue: Readonly<ITrails> = {};
