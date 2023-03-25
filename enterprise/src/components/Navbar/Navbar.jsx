import React from "react";
import { Container } from "react-bootstrap";
import "../Navbar/Navbar.css";


const Navbar = () => {
  return (
    <Container>
      <div className="navbar d-flex mx-4 ">
        {/* ===========search=========== */}
        <div className="search d-flex align-item-center justify-center px-3 gap-2">
          <i class="ri-search-line fs-4"></i>
          <form className="pt-1">
            <input
              className="searchInput"
              type="text"
              placeholder="Search"
            ></input>
          </form>
        </div>
        {/* ===========right=========== */}
        <div className="d-flex align-items-center gap-4">
          <div className="right-nav ">
            <i class="ri-notification-2-line fs-4"></i>
          </div>

          <div className="right-nav ">
            <i class="ri-user-line fs-4"></i>
          </div>
        </div>
      </div>

    </Container>
  );
};

export default Navbar;
