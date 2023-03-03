import React from "react";
import { Col, Container, Row } from "react-bootstrap";
const Home = () => {
  return (
    <Container>
      <Row className="px-5">
        <Col lg="9" md="9">
          <div className="content shadow-lg p-3 bg-body rounded">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates deleniti, a rem excepturi facilis labore consequatur
              sequi tempore temporibus tenetur debitis libero, ipsum atque
              exercitationem ducimus quas at facere nihil! Voluptates deleniti,
              a re
            </p>
            <div className="content_btn d-flex align-items-center gap-5"></div>
          </div>
        </Col>

        <Col lg="3" md="3">
          <div className="content shadow-lg p-3 bg-body rounded">
            <h4>Tag</h4>
            <ul>
              <li>hello</li>
              <li>hello</li>
              <li>hello</li>
              <li>hello</li>
              <li>hello</li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
