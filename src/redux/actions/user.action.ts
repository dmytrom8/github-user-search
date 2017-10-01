import {
  EUserActionTypes,

  GetUsersRequestPayload,
  GetUsersRequest,
  GetUsersSuccessPayload,
  GetUsersSuccess,
  GetUsersFailurePayload,
  GetUsersFailure,
} from '../actionTypes/user.actionType';

export const getUsersRequest = (payload: GetUsersRequestPayload = {
  searchKey: '',
  page: 1,
  perPage: 9,
}): GetUsersRequest => ({
  type: EUserActionTypes.GET_USERS_REQUEST,
  payload,
});

export const getUsersSuccess = (payload: GetUsersSuccessPayload): GetUsersSuccess => ({
  type: EUserActionTypes.GET_USERS_SUCCESS,
  payload,
});

export const getUsersFailure = (payload: GetUsersFailurePayload): GetUsersFailure => ({
  type: EUserActionTypes.GET_USERS_FAILURE,
  payload,
});
