import React from "react";
import { Col, Row } from "react-bootstrap";
import { Post } from "../components/HomeCon/Status/Status";
import Tag from "../components/HomeCon/Tag/Tag";
const Home = () => {
  return (
    <div className="px-4 pt-3 pb-5">
      <Row className="px-2">
        <Col lg="9" md="9">
          
            <Post />
       
        </Col>

        {/* ================= Tag ================= */}
        <Col lg="3" md="3">
          <Tag />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
