
import React, { useState } from 'react';
import { Col, InputGroup, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function CreatePost() {

const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Your Post</Modal.Title>
      </Modal.Header>
      {/* =======================Body Start======================= */}
      <Form>
        <Modal.Body>
          <Row>
            <form className='px-4'>
              <label>Title</label>
              <Form.Control
                className="mb-4 "
                rows={4}
                style={{ borderRadius: "15px" }}
              />

              <label>Post</label>
              <Form.Control
                className="mb-4"
                as="textarea"
                rows={4}
                style={{ borderRadius: "15px" }}
              />
              <Form>
                <label>Add image</label>
                <input type="file" style={{ borderRadius: "15px" }} />
                {/* ====== img End ====== */}
                {/* ====== content Start ====== */}
              </Form>
              {/* ====== content End ====== */}
            </form>
          </Row>
        </Modal.Body>

        {/* =======================Body End======================= */}
        <Modal.Footer>
         
          <Button type="Submit" variant="primary" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </>
  );
}
export default CreatePost;