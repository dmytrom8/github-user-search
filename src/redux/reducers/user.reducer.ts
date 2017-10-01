import {
  EUserActionTypes,
  UserActionTypes,
} from '../actionTypes/user.actionType';
import {
  UserState,
  initialUserState,
} from '../state/user.state';

export default function userReducers(
  state = initialUserState(),
  action: UserActionTypes,
): UserState {
  switch (action.type) {
    case EUserActionTypes.GET_USERS_REQUEST:
      return {
        ...state,
        loading: true,

        searchKey: action.payload.searchKey,
        page: action.payload.page,
        perPage: action.payload.perPage,
      };
    case EUserActionTypes.GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,

        error: null,
        totalCount: action.payload.totalCount,
        users: action.payload.users,
      };
    case EUserActionTypes.GET_USERS_FAILURE:
      return {
        ...state,
        loading: false,

        error: action.payload.error,
      };
    default:
      return state;
  }
}
