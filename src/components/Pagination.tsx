import React from 'react';
import {
  Row, Col, Button,
} from 'react-bootstrap';
import {
  SkipStart,
  SkipEnd,
  CaretLeft,
  CaretRight,
} from 'react-bootstrap-icons';
import { useSelector, useDispatch } from 'react-redux';
import { getUsersRequest } from '../redux/actions/user.action';
import {
  pageSelector,
  perPageSelector,
  totalCountSelector,
} from '../redux/selectors/user.selector';

const Pagination = (props: { searchKey: string | undefined }) => {
  const { searchKey: currentSearchKey } = props;
  const page = useSelector(pageSelector) || 1;
  const perPage = useSelector(perPageSelector) || 9;
  const totalCount = useSelector(totalCountSelector);

  const dispatch = useDispatch();

  const totalPages = Math.ceil(totalCount / perPage);

  const onPage = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) {
      return;
    }

    dispatch(getUsersRequest({
      searchKey: currentSearchKey,
      page: pageNumber,
      perPage,
    }));
  };

  if (!totalCount) {
    return null;
  }

  return (
    <Row className="mb-3 align-items-center justify-content-center">
      <Col xs={6} md={2} lg={1}>
        <Button
          variant="dark"
          disabled={page === 1}
          onClick={() => onPage(1)}
          data-testid="page-start"
        >
          <SkipStart size={30} />
        </Button>
      </Col>
      <Col xs={6} md={2} lg={1}>
        <Button
          variant="dark"
          disabled={page === 1}
          onClick={() => onPage(page - 1)}
          data-testid="page-prev"
        >
          <CaretLeft size={30} />
        </Button>
      </Col>
      <Col xs={12} md={2} lg={1}>
        <div>
          {`${page} / ${totalPages}`}
        </div>
      </Col>
      <Col xs={6} md={2} lg={1}>
        <Button
          variant="dark"
          disabled={page >= totalPages}
          onClick={() => onPage(page + 1)}
          data-testid="page-next"
        >
          <CaretRight size={30} />
        </Button>
      </Col>
      <Col xs={6} md={2} lg={1}>
        <Button
          variant="dark"
          disabled={page >= totalPages}
          onClick={() => onPage(totalPages)}
          data-testid="page-end"
        >
          <SkipEnd size={30} />
        </Button>
      </Col>
    </Row>
  );
};

export default Pagination;
