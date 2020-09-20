import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITrails, defaultValue } from 'app/shared/model/trails.model';

export const ACTION_TYPES = {
  FETCH_TRAILS_LIST: 'trails/FETCH_TRAILS_LIST',
  FETCH_TRAILS: 'trails/FETCH_TRAILS',
  CREATE_TRAILS: 'trails/CREATE_TRAILS',
  UPDATE_TRAILS: 'trails/UPDATE_TRAILS',
  DELETE_TRAILS: 'trails/DELETE_TRAILS',
  RESET: 'trails/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITrails>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type TrailsState = Readonly<typeof initialState>;

// Reducer

export default (state: TrailsState = initialState, action): TrailsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TRAILS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TRAILS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_TRAILS):
    case REQUEST(ACTION_TYPES.UPDATE_TRAILS):
    case REQUEST(ACTION_TYPES.DELETE_TRAILS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_TRAILS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TRAILS):
    case FAILURE(ACTION_TYPES.CREATE_TRAILS):
    case FAILURE(ACTION_TYPES.UPDATE_TRAILS):
    case FAILURE(ACTION_TYPES.DELETE_TRAILS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRAILS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRAILS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_TRAILS):
    case SUCCESS(ACTION_TYPES.UPDATE_TRAILS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_TRAILS):
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

const apiUrl = 'api/trails';

// Actions

export const getEntities: ICrudGetAllAction<ITrails> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TRAILS_LIST,
  payload: axios.get<ITrails>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ITrails> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TRAILS,
    payload: axios.get<ITrails>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ITrails> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TRAILS,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITrails> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TRAILS,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITrails> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TRAILS,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
