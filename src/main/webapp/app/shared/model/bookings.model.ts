import { ITrails } from 'app/shared/model/trails.model';
import { IUsers } from 'app/shared/model/users.model';
import { Status } from 'app/shared/model/enumerations/status.model';

export interface IBookings {
  id?: number;
  status?: Status;
  trail?: ITrails;
  user?: IUsers;
}

export const defaultValue: Readonly<IBookings> = {};
