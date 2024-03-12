import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { NavbarBrand } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import { IoIosSearch } from "react-icons/io";
import { RiContactsLine } from "react-icons/ri";
import { IoGridSharp } from "react-icons/io5";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

function DashboardNavbar({ setQuery, handleSearchClick, query }) {
  const nav = useNavigate();
  return (
    <div>
      <div class="relative">
        {[false].map((expand) => (
          <Navbar
            key={expand}
            expand={expand}
            className="bg-body-tertiary w-[-webkit-fill-available] p-2 fixed shadow-md z-[100] bg-white"
          >
            <Container fluid>
              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-${expand}`}
              />

              <NavbarBrand className="hidden md:block">
                <InputGroup className="w-96">
                  {/* search input element */}
                  <Form.Control
                    placeholder="Search"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    style={{ height: 35 }}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" ? handleSearchClick(e) : null
                    }
                  />
                  {/* search button */}
                  <InputGroup.Text
                    id="basic-addon1"
                    className="text-white"
                    style={{
                      height: 36,
                      backgroundColor: "#bd9229",
                      cursor: "pointer",
                    }}
                    onClick={handleSearchClick}
                  >
                    <IoIosSearch className="text-2xl" />
                  </InputGroup.Text>
                </InputGroup>
              </NavbarBrand>

              <NavbarBrand className="block md:hidden">
                <img
                  width="60px"
                  alt="wa icon"
                  src="https://ik.imagekit.io/p2slevyg1/WhatsApp%20Image%202024-01-01%20at%2012.04.01%20AM.jpeg?updatedAt=1704049949841"
                />
              </NavbarBrand>

              <Navbar.Brand
                href="#"
                className="d-flex flex-row "
                style={{ borderRadius: "0px 24px 24px 0px" }}
              >
                <span>
                  <img
                    height="25px"
                    width="24px"
                    // style={{ marginTop: 5 }}
                    src="https://ik.imagekit.io/p2slevyg1/bell%20icon.png?updatedAt=1705346486945"
                    alt="bell"
                  />
                </span>
                <span>
                  <img
                    height="30px"
                    width="32px"
                    //   class="py-3"
                    alt="icon img"
                    src="https://ik.imagekit.io/p2slevyg1/profile%20(1).png?updatedAt=1704099476479"
                    onClick={(e) => {
                      e.preventDefault();
                      nav("/dashboard/profile");
                    }}
                  />
                </span>
              </Navbar.Brand>

              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="start"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title
                    id={`offcanvasNavbarLabel-expand-${expand}`}
                  ></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link href="/dashboard" class="mb-3 text-xl">
                      Dashboard
                    </Nav.Link>
                    {/* <Nav.Link
                      href="/dashboard/addCategory"
                      class="mb-3 text-xl "
                    >
                      Create Category
                    </Nav.Link> */}
                    <Nav.Link
                      href="/dashboard/all_category"
                      class="mb-3 text-xl "
                    >
                      Collections
                    </Nav.Link>
                    {/* <Nav.Link href="/dashboard/allFilter" class="mb-3 text-xl">
                      Filters
                    </Nav.Link> */}
                    <Nav.Link href="/dashboard/allProduct" class="mb-3 text-xl">
                      Products
                    </Nav.Link>
                    <Nav.Link href="/dashboard/orders" class="mb-3 text-xl">
                      Orders
                    </Nav.Link>
                    {/* <Nav.Link
                      href="/dashboard/allFlavours"
                      class="mb-3 text-xl"
                    >
                      Flavours
                    </Nav.Link> */}
                    {/* <Nav.Link href="/dashboard/allOffers" class="mb-3 text-xl">
                      Offers
                    </Nav.Link> */}
                    {/* <Nav.Link href="/dashboard/profile" class="mb-3 text-xl">
                      Profile
                    </Nav.Link> */}
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}
      </div>

      <div
        class="w-48 bg-[#bd9229] rounded-r-lg absolute p-5 md:block hidden fixed h-screen"
        style={{ zIndex: 1000, position: "fixed" }}
      >
        <Link to="/">
          {" "}
          <img
            width="100px "
            class="text-center bg-white rounded-pill"
            style={{ marginTop: -27 }}
            alt=""
            src="https://ik.imagekit.io/mctozv7td/Meena%20Bazar%20Final%20Logo%20png-02.png?updatedAt=1709073934723"
          />
        </Link>
        <div className="d-flex flex-row  w-48 mt-3 gap-3">
          <p
            className="flex items-center gap-2  w-48 text-base text-white hover:text-black  p-3
            focus-within:bg-white border-y border-[#bd9229] "
            style={{ marginLeft: -48 }}
          >
            <NavLink
              to="/dashboard"
              className="flex hover:text-black align-baseline"
            >
              <span className="mr-4 py-1">
                <IoGridSharp />
              </span>
              <span>Dashboard</span>
            </NavLink>
          </p>
        </div>

        <div className="d-flex text-white flex-row w-48 gap-3">
          <p
            className="flex items-center gap-2  w-48 text-base text-white hover:text-black  p-3
            focus-within:bg-white border-y border-[#bd9229]"
            style={{ marginLeft: -48 }}
          >
            <NavLink
              to="/dashboard/all_category"
              className="flex hover:text-black align-baseline"
            >
              <span className="mr-4 py-1">
                <IoGridSharp />
              </span>
              <span>Collections</span>
            </NavLink>
          </p>
        </div>

        {/* <div className="d-flex text-white flex-row w-48 gap-3">
          <p
            className="flex items-center gap-2  w-48 text-base text-white hover:text-black  p-3
            focus-within:bg-white border-y border-[#bd9229]"
            style={{ marginLeft: -48 }}
          >
            <NavLink
              to="/dashboard/allFilters"
              className="flex hover:text-black align-baseline"
            >
              <span className="mr-4 py-1">
                <IoGridSharp />
              </span>
              <span>Filters</span>
            </NavLink>
          </p>
        </div> */}

        <div className="d-flex flex-row w-48 gap-3">
          <p
            className="flex items-center gap-2  w-48 text-base text-white hover:text-black  p-3
            focus-within:bg-white border-y border-[#bd9229]"
            style={{ marginLeft: -48 }}
          >
            <NavLink
              to="/dashboard/all_product"
              className="flex hover:text-black align-baseline"
            >
              <span className="mr-4 py-1">
                <IoGridSharp />
              </span>
              <span>Products</span>
            </NavLink>
          </p>
        </div>

        <div className="d-flex flex-row w-48 gap-3">
          <p
            className="flex items-center gap-2  w-48 text-base text-white hover:text-black  p-3
            focus-within:bg-white border-y border-[#bd9229]"
            style={{ marginLeft: -48 }}
          >
            <NavLink
              to="/dashboard/orders"
              className="flex hover:text-black align-baseline"
            >
              <span className="mr-4 py-1">
                <IoGridSharp />
              </span>
              <span>Orders</span>
            </NavLink>
          </p>
        </div>

        {/* <div className="d-flex text-white flex-row w-48 gap-3">
          <p
            className="flex items-center gap-2  w-48 text-base text-white hover:text-black  p-3
            focus-within:bg-white border-y border-[#bd9229]"
            style={{ marginLeft: -48 }}
          >
            <NavLink
              to="/dashboard/addCategory"
              className="flex hover:text-black align-baseline"
            >
              <span className="mr-4 py-1">
                <IoGridSharp />
              </span>
              <span>Create Category</span>
            </NavLink>
          </p>
        </div> */}

        {/* <div className="d-flex text-white flex-row w-48 gap-3">
          <p
            className="flex items-center gap-2  w-48 text-base text-white hover:text-black  p-3
            focus-within:bg-white border-y border-[#bd9229]"
            style={{ marginLeft: -48 }}
          >
            <NavLink
              to="/dashboard/allFlavours"
              className="flex hover:text-black align-baseline"
            >
              <span className="mr-4 py-1">
                <IoGridSharp />
              </span>
              <span>Flavours</span>
            </NavLink>
          </p>
        </div> */}

        {/* <div className="d-flex text-white flex-row w-48 gap-3">
          <p
            className="flex items-center gap-2  w-48 text-base text-white hover:text-black  p-3
            focus-within:bg-white border-y border-[#bd9229]"
            style={{ marginLeft: -48 }}
          >
            <NavLink
              to="/dashboard/allOffers"
              className="flex hover:text-black align-baseline"
            >
              <span className="mr-4 py-1">
                <IoGridSharp />
              </span>
              <span>Offers</span>
            </NavLink>
          </p>
        </div> */}

        {/* <div className="d-flex text-white flex-row w-48 gap-3">
          <p
            className="flex items-center gap-2  w-48 text-base text-white hover:text-black  p-3
            focus-within:bg-white border-y border-[#bd9229]"
            style={{ marginLeft: -48 }}
          >
            <NavLink
              to="/dashboard/profile"
              className="flex hover:text-black align-baseline"
            >
              <span className="mr-4 py-1">
                <IoGridSharp />
              </span>
              <span>My Profile</span>
            </NavLink>
          </p>
        </div> */}
      </div>
    </div>
  );
}

export default DashboardNavbar;
