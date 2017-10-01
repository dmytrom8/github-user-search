import axios from 'axios';
import * as queryString from 'query-string';

import { GetUsersRequestPayload } from '../redux/actionTypes/user.actionType';

export const API_URL = 'https://api.github.com/search/users';

export const search = async (payload: GetUsersRequestPayload = {
  searchKey: '',
  page: 1,
  perPage: 9,
}) => {
  const {
    searchKey, page, perPage,
  } = payload;

  const requestQueryString = queryString.stringify({
    q: `${searchKey} in:login`,
    page,
    per_page: perPage,
  });

  return axios.get(`${API_URL}?${requestQueryString}`);
};
