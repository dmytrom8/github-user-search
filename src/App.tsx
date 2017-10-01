import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

import './styles/App.scss';

import Search from './components/Search';
import Results from './components/Results';

function App() {
  return (
    <div className="App">
      <div className="app-container">
        <Card className="bg-dark text-white flex-fill w-100">
          <Card.Header className="h2">Search users on github.com</Card.Header>
          <Card.Body>
            <Row className="flex-column">
              <Col>
                <Search />
              </Col>
              <Col>
                <Results />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default App;
