import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IBookings, defaultValue } from 'app/shared/model/bookings.model';

export const ACTION_TYPES = {
  FETCH_BOOKINGS_LIST: 'bookings/FETCH_BOOKINGS_LIST',
  FETCH_BOOKINGS: 'bookings/FETCH_BOOKINGS',
  CREATE_BOOKINGS: 'bookings/CREATE_BOOKINGS',
  UPDATE_BOOKINGS: 'bookings/UPDATE_BOOKINGS',
  DELETE_BOOKINGS: 'bookings/DELETE_BOOKINGS',
  RESET: 'bookings/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IBookings>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type BookingsState = Readonly<typeof initialState>;

// Reducer

export default (state: BookingsState = initialState, action): BookingsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_BOOKINGS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_BOOKINGS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_BOOKINGS):
    case REQUEST(ACTION_TYPES.UPDATE_BOOKINGS):
    case REQUEST(ACTION_TYPES.DELETE_BOOKINGS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_BOOKINGS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BOOKINGS):
    case FAILURE(ACTION_TYPES.CREATE_BOOKINGS):
    case FAILURE(ACTION_TYPES.UPDATE_BOOKINGS):
    case FAILURE(ACTION_TYPES.DELETE_BOOKINGS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_BOOKINGS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_BOOKINGS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_BOOKINGS):
    case SUCCESS(ACTION_TYPES.UPDATE_BOOKINGS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_BOOKINGS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/bookings';

// Actions

export const getEntities: ICrudGetAllAction<IBookings> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_BOOKINGS_LIST,
  payload: axios.get<IBookings>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IBookings> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_BOOKINGS,
    payload: axios.get<IBookings>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IBookings> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_BOOKINGS,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IBookings> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_BOOKINGS,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IBookings> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_BOOKINGS,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
