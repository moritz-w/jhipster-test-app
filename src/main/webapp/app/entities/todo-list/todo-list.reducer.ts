import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITodoList, defaultValue } from 'app/shared/model/todo-list.model';

export const ACTION_TYPES = {
  FETCH_TODOLIST_LIST: 'todoList/FETCH_TODOLIST_LIST',
  FETCH_TODOLIST: 'todoList/FETCH_TODOLIST',
  CREATE_TODOLIST: 'todoList/CREATE_TODOLIST',
  UPDATE_TODOLIST: 'todoList/UPDATE_TODOLIST',
  DELETE_TODOLIST: 'todoList/DELETE_TODOLIST',
  RESET: 'todoList/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITodoList>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type TodoListState = Readonly<typeof initialState>;

// Reducer

export default (state: TodoListState = initialState, action): TodoListState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TODOLIST_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TODOLIST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TODOLIST):
    case REQUEST(ACTION_TYPES.UPDATE_TODOLIST):
    case REQUEST(ACTION_TYPES.DELETE_TODOLIST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TODOLIST_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TODOLIST):
    case FAILURE(ACTION_TYPES.CREATE_TODOLIST):
    case FAILURE(ACTION_TYPES.UPDATE_TODOLIST):
    case FAILURE(ACTION_TYPES.DELETE_TODOLIST):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TODOLIST_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TODOLIST):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TODOLIST):
    case SUCCESS(ACTION_TYPES.UPDATE_TODOLIST):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TODOLIST):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/todo-lists';

// Actions

export const getEntities: ICrudGetAllAction<ITodoList> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TODOLIST_LIST,
  payload: axios.get<ITodoList>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ITodoList> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TODOLIST,
    payload: axios.get<ITodoList>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITodoList> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TODOLIST,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITodoList> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TODOLIST,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITodoList> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TODOLIST,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
