import React from 'react';
import axios, { AxiosResponse } from 'axios';
import * as queryString from 'query-string';
import userEvent from '@testing-library/user-event';
import {
  render,
  screen,
  getNodeText,
  within,
} from './test.utils';
import App from '../App';

import githubResponse from './githubResponse.json';
import { API_URL } from '../services/user.service';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('App component', () => {
  afterAll(() => {
    jest.unmock('axios');
  });

  test('should render card header', () => {
    render(<App />);

    const cardHeader = screen.getByText('Search users on github.com');
    expect(cardHeader).toBeInTheDocument();
  });

  test('should render search form', () => {
    render(<App />);

    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();

    const loginInput = screen.getByPlaceholderText('Login');
    expect(loginInput).toBeInTheDocument();

    const submitButton = screen.getByText('Submit');
    expect(submitButton).toBeInTheDocument();
  });

  test('should render results table', () => {
    render(<App />);

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    const tableHeaderList = screen.getAllByRole('columnheader');
    expect(tableHeaderList).toHaveLength(3);

    const headerTexts = ['Avatar', 'Login', 'Type'];
    tableHeaderList.forEach((header, i) => {
      expect(getNodeText(header)).toEqual(headerTexts[i]);
    });
  });

  test('should display search results', async () => {
    const searchKey = 'foo';

    const testSearchByFoo = async () => {
      const mockedResponse: AxiosResponse = {
        data: githubResponse,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      };
      mockedAxios.get.mockResolvedValueOnce(mockedResponse);

      const loginInput = screen.getByPlaceholderText('Login');
      const submitButton = screen.getByText('Submit');

      // user types 'foo' on input
      userEvent.type(loginInput, searchKey);
      expect(loginInput).toHaveValue(searchKey);

      // user clicks submit button
      userEvent.click(submitButton);

      const pageStart = await screen.findByTestId('page-start');
      expect(pageStart).toBeInTheDocument();
      expect(pageStart).toHaveAttribute('disabled');

      const pagePrev = await screen.findByTestId('page-prev');
      expect(pagePrev).toBeInTheDocument();
      expect(pagePrev).toHaveAttribute('disabled');

      const pageNext = await screen.findByTestId('page-next');
      expect(pageNext).toBeInTheDocument();
      expect(pageNext).not.toHaveAttribute('disabled');

      const pageEnd = await screen.findByTestId('page-end');
      expect(pageEnd).toBeInTheDocument();
      expect(pageEnd).not.toHaveAttribute('disabled');

      const paginationText = await screen.findByText('1 / 2');
      expect(paginationText).toBeInTheDocument();

      const { items } = githubResponse;
      const spinners = await screen.findAllByRole('progressbar');

      spinners.forEach((spinner) => {
        const avatarUrl = spinner.getAttribute('data-testid');
        const rowData = items.find((item) => item.avatar_url === avatarUrl);

        const row = spinner.closest('tr');
        const withinRow = within(row as HTMLElement);
        expect(withinRow.getByText(rowData?.login as string)).toBeInTheDocument();
        expect(withinRow.getByText(rowData?.type as string)).toBeInTheDocument();
      });

      const requestQueryString = queryString.stringify({
        q: `${searchKey} in:login`,
        page: 1,
        per_page: 9,
      });
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).lastCalledWith(`${API_URL}?${requestQueryString}`);

      // user clicks move to first button
      userEvent.click(pageStart);
      expect(axios.get).toHaveBeenCalledTimes(1);

      // user clicks move to prev button
      userEvent.click(pagePrev);
      expect(axios.get).toHaveBeenCalledTimes(1);

      // user clicks move to next button
      userEvent.click(pageNext);
      expect(axios.get).toHaveBeenCalledTimes(2);
      expect(paginationText).toHaveTextContent('2 / 2');

      // user clicks move to last button
      userEvent.click(pageEnd);
      expect(axios.get).toHaveBeenCalledTimes(2);
    };

    render(<App />);

    await testSearchByFoo();
  });
});
