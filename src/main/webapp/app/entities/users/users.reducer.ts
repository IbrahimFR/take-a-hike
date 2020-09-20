import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IUsers, defaultValue } from 'app/shared/model/users.model';

export const ACTION_TYPES = {
  FETCH_USERS_LIST: 'users/FETCH_USERS_LIST',
  FETCH_USERS: 'users/FETCH_USERS',
  CREATE_USERS: 'users/CREATE_USERS',
  UPDATE_USERS: 'users/UPDATE_USERS',
  DELETE_USERS: 'users/DELETE_USERS',
  RESET: 'users/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IUsers>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type UsersState = Readonly<typeof initialState>;

// Reducer

export default (state: UsersState = initialState, action): UsersState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_USERS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_USERS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_USERS):
    case REQUEST(ACTION_TYPES.UPDATE_USERS):
    case REQUEST(ACTION_TYPES.DELETE_USERS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_USERS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_USERS):
    case FAILURE(ACTION_TYPES.CREATE_USERS):
    case FAILURE(ACTION_TYPES.UPDATE_USERS):
    case FAILURE(ACTION_TYPES.DELETE_USERS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_USERS):
    case SUCCESS(ACTION_TYPES.UPDATE_USERS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_USERS):
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

const apiUrl = 'api/users';

// Actions

export const getEntities: ICrudGetAllAction<IUsers> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_USERS_LIST,
  payload: axios.get<IUsers>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IUsers> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_USERS,
    payload: axios.get<IUsers>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IUsers> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_USERS,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IUsers> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_USERS,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IUsers> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_USERS,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
