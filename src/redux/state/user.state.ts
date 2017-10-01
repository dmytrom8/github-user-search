import User from '../../models/User';

export interface UserState {
  loading: boolean;
  searchKey?: string;
  page?: number;
  perPage?: number;
  totalCount: number;
  users: User[],
  error: string | null;
}

export const initialUserState = (): UserState => ({
  loading: false,

  searchKey: '',
  page: 1,
  perPage: 9,

  totalCount: 0,
  users: [],
  error: null,
});
