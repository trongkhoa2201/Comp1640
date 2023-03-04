import React from "react";
import { Col, Row } from "react-bootstrap";
import { Status } from "../components/HomeCon/Status/Status";
import Tag from "../components/HomeCon/Tag/Tag";
import"../Styles/home.css"
const Home = () => {
  return (
    <div className="px-4 pt-3 pb-5">
      <Row className="status px-2">
        <Col lg="9" md="9">
          <Status />
          <Status />
          <Status />
          <Status />
          <Status />
          <Status />
          <Status />
        </Col>

        {/* ================= Tag ================= */}
        <Col className="Tag " lg="3" md="3">
          <Tag />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
