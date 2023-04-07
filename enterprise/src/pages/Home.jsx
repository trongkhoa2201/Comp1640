import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Status } from '../components/HomeCon/Status/Status';
import Tag from '../components/HomeCon/Tag/Tag';
import Trend from '../components/TopTrend/Trend';
import '../Styles/home.css';
// import { ToastContainer } from 'react-toastify';
const Home = () => {
    return (
        <div className="px-4 pt-3 pb-5">
            <div>
                <Trend />
            </div>
            <Row className="status px-4">
                {/* ================= Status ================= */}
                <Col lg="9" md="9">
                    <Status />
                </Col>
                {/* ================= Tag ================= */}
                <Col className="Tag " lg="3" md="3">
                    <Tag />
                </Col>
                {/* <ToastContainer position="bottom-center" limit={1} /> */}
            </Row>
        </div>
    );
};

export default Home;
