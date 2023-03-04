import React from "react";
import { Form } from "react-bootstrap";
import Ava from "../../../img/Ava.jpg";
import "../Status/Status.css"

export const Status = () => {
  return (
    <div className="post shadow-lg p-3 bg-body rounded">
      <div className="d-flex align-items-center justify-content-between ">
        {/* ================= avatar ================= */}
        <div className="ava">
          <img
            src={Ava}
            alt="Ava"
            style={{ height: 60, width: 60, borderRadius: "50%" }}
          />
        </div>
        {/* ================= input post ================= */}
        <div style={{ width: "80%" }}>
          <Form>
            <Form.Control
              as="textarea"
              rows={1}
              placeholder="What are you things ?"
            />
          </Form>
        </div>
        {/* ================= button ================= */}
        <button className="btn_post px-4 ">Post</button>
      </div>
      <div className="d-flex mt-3 gap-3 ">
        <i class="ri-image-line fs-2"></i>
        <i class="ri-links-line fs-2"></i>
      </div>
    </div>
  );
};
