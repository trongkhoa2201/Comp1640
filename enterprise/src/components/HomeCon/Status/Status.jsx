import React, { useState } from "react";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Ava from "../../../img/Ava.jpg";
import CreatePost from "../../CreatePost/CreatePost";
import "../Status/Status.css";


export const Status = () => {
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

  return (
    <div className='post shadow-lg p-3 bg-body rounded'>
      <div className='d-flex align-items-center justify-content-between '>
        {/* ================= avatar ================= */}
        <div className='ava'>
          <img
            src={Ava}
            alt='Ava'
            style={{ height: 60, width: 60, borderRadius: "50%" }}
          />
        </div>
        {/* ================= input post ================= */}
        <div style={{ width: "80%" }}>
          <Form>
            <Form.Control
              as='Description'
              rows={3}
              placeholder='what do u think ?'
            />
          </Form>
        </div>
        {/* ================= button ================= */}
        <Button className='btn_post px-4 ' onClick={handleShow}>
          Post
        </Button>
        <Modal size='lg' show={show} onHide={handleClose}>
          <CreatePost />
        </Modal>
      </div>

      <div className='d-flex mt-3 gap-3 '>
        <i class='ri-image-line fs-2'></i>
        <i class='ri-links-line fs-2'></i>
      </div>
    </div>
  );
};
