import { RootState } from '../state';

export const loadingSelector = (state: RootState) => state.user.loading;
export const searchKeySelector = (state: RootState) => state.user.searchKey;
export const pageSelector = (state: RootState) => state.user.page;
export const perPageSelector = (state: RootState) => state.user.perPage;
export const totalCountSelector = (state: RootState) => state.user.totalCount;
export const usersSelector = (state: RootState) => state.user.users;
export const errorSelector = (state: RootState) => state.user.error;
