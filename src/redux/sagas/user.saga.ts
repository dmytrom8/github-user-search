import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

import { search } from '../../services/user.service';
import {
  EUserActionTypes,
  GetUsersRequest,
} from '../actionTypes/user.actionType';
import { getUsersSuccess, getUsersFailure } from '../actions/user.action';
import User from '../../models/User';

import { ResponseGenerator } from './index';

function* fetchUsers(action: GetUsersRequest) {
  try {
    const response: ResponseGenerator = yield call(search, {
      searchKey: action.payload.searchKey,
      page: action.payload.page,
      perPage: action.payload.perPage,
    });

    const {
      total_count: totalCount,
      items,
    } = response.data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const users: User[] = items.map((item: any) => ({
      avatarUrl: item.avatar_url,
      login: item.login,
      type: item.type,
    }));

    yield put(getUsersSuccess({ users, totalCount }));
  } catch (err) {
    yield put(getUsersFailure({ error: err.message || err }));
  }
}

function* userSaga() {
  yield all([takeLatest(EUserActionTypes.GET_USERS_REQUEST, fetchUsers)]);
}

export default userSaga;
