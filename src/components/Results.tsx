import React, { useMemo } from 'react';
import {
  Container, Table, Spinner,
} from 'react-bootstrap';
import { useSortBy, useTable, CellProps } from 'react-table';
import { useSelector } from 'react-redux';

import Avatar from './Avatar';
import User from '../models/User';
import {
  loadingSelector,
  errorSelector,
  usersSelector,
} from '../redux/selectors/user.selector';

const Results = () => {
  const loading = useSelector(loadingSelector);
  const error = useSelector(errorSelector);
  const users = useSelector(usersSelector);

  const columns = useMemo(() => [{
    Header: 'Avatar',
    accessor: 'avatarUrl',
    disableSortBy: true,
    Cell: ({ cell: { value } }: CellProps<User>) => (<Avatar url={value} />),
  }, {
    Header: 'Login',
    accessor: 'login',
  },
  {
    Header: 'Type',
    accessor: 'type',
    disableSortBy: true,
  }], []);

  const data = useMemo(() => users, [users]);

  const {
    getTableProps, getTableBodyProps, headerGroups, rows, prepareRow,
  } = useTable({
    columns: columns as never[],
    data,
  }, useSortBy);

  return (
    <Container>
      {loading && <Spinner animation="border" />}
      {!loading && error && <p>{error}</p>}
      {!loading && !error && (
        <Table responsive striped bordered hover variant="dark" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  const sortAsc = (column.isSorted && !column.isSortedDesc) ? 'sort-asc' : '';
                  const sortDesc = (column.isSorted && column.isSortedDesc) ? 'sort-desc' : '';

                  return (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className={`${sortAsc} ${sortDesc}`}
                    >
                      {column.render('Header')}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Results;
