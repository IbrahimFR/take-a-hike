import { IBookings } from 'app/shared/model/bookings.model';

export interface IUsers {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  bookings?: IBookings[];
}

export const defaultValue: Readonly<IUsers> = {};
