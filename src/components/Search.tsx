import React, { useState } from 'react';
import {
  Container,
  Form,
  InputGroup,
  FormControl,
  Button,
  Row,
  Col,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import Pagination from './Pagination';

import { getUsersRequest } from '../redux/actions/user.action';
import {
  searchKeySelector,
  pageSelector,
  perPageSelector,
} from '../redux/selectors/user.selector';

const Search = () => {
  const searchKey = useSelector(searchKeySelector);
  const page = useSelector(pageSelector);
  const perPage = useSelector(perPageSelector);

  const dispatch = useDispatch();

  const [currentSearchKey, setCurrentSearchKey] = useState(searchKey);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(getUsersRequest({
      searchKey: currentSearchKey,
      page,
      perPage,
    }));
  };

  return (
    <Container>
      <Row className="flex-column">
        <Col>
          <Form role="form" onSubmit={(event) => onSubmit(event)}>
            <Form.Label htmlFor="formInputSearchKey" srOnly>
              Login
            </Form.Label>
            <InputGroup className="mb-3">
              <FormControl
                id="formInputSearchKey"
                placeholder="Login"
                aria-label="Login"
                aria-describedby="basic-addon2"
                value={currentSearchKey}
                onChange={(e) => setCurrentSearchKey(e.target.value)}
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" type="submit">
                  Submit
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </Col>
        <Col>
          <Pagination searchKey={currentSearchKey} />
        </Col>
      </Row>
    </Container>
  );
};

export default Search;
