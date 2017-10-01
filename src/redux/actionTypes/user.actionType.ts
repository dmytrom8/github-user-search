import User from '../../models/User';

export enum EUserActionTypes {
  GET_USERS_REQUEST = '[User] GET_USERS_REQUEST',
  GET_USERS_SUCCESS = '[User] GET_USERS_SUCCESS',
  GET_USERS_FAILURE = '[User] GET_USERS_FAILURE',
}

export interface GetUsersRequestPayload {
  searchKey?: string;
  page?: number;
  perPage?: number;
}

export interface GetUsersRequest {
  type: EUserActionTypes.GET_USERS_REQUEST;
  payload: GetUsersRequestPayload;
}

export interface GetUsersSuccessPayload {
  totalCount: number;
  users: User[];
}

export interface GetUsersSuccess {
  type: EUserActionTypes.GET_USERS_SUCCESS;
  payload: GetUsersSuccessPayload;
}

export interface GetUsersFailurePayload {
  error: string,
}

export interface GetUsersFailure {
  type: EUserActionTypes.GET_USERS_FAILURE;
  payload: GetUsersFailurePayload;
}

export type UserActionTypes = GetUsersRequest | GetUsersSuccess | GetUsersFailure;
