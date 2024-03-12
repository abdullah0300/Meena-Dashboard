import React from "react";
import DashboardNavbar from "./DashboardNavbar";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";

function MainPage() {
  return (
    <div>
      <DashboardNavbar />
      <Container>
        <div class="row z-5 row-cols-2 row-cols-lg-4 mt-24 absolute gap-5 lg:left-[350px]">
          <div class="col bg-white shadow-md p-2 w-44">
            <div className="d-flex flex-row p-2 gap-3 ">
              <p class="font-bold ">
                0 <br />
                Daily Orders
              </p>
              <span>
                <img
                  alt="img-icon"
                  src="https://ik.imagekit.io/p2slevyg1/Group%20330.png?updatedAt=1705436503731"
                />
              </span>
            </div>
          </div>

          <div class="col bg-white shadow-md p-2 w-44">
            <div className="d-flex flex-row gap-3 p-1 ">
              <p class="font-bold ">
                0 <br />
                Weekly Orders
              </p>
              <span>
                <img
                  alt="img-icon"
                  src="https://ik.imagekit.io/p2slevyg1/Group%20330.png?updatedAt=1705436503731"
                />
              </span>
            </div>
          </div>

          <div class="col bg-white shadow-md p-2 w-44">
            <div className="d-flex flex-row gap-3 p-1">
              <p class="font-bold">
                0 <br />
                Daily Revenue
              </p>
              <span>
                <img
                  alt="img-icon"
                  src="https://ik.imagekit.io/p2slevyg1/Group%20330.png?updatedAt=1705436503731"
                />
              </span>
            </div>
          </div>

          <div class="col bg-white shadow-md p-2 w-44">
            <div className="d-flex flex-row gap-3  ">
              <p class="font-bold">
                0 <br />
                Weekly Revenue
              </p>
              <span>
                <img
                  alt="img-icon"
                  src="https://ik.imagekit.io/p2slevyg1/Group%20330.png?updatedAt=1705436503731"
                />
              </span>
            </div>
          </div>
        </div>
      </Container>

      <div class="absolute mt-72 lg:left-[200px] bg-white p-4">
        <h2 class="font-bold mb-3 text-xl">Recent Orders</h2>
        {true ? (
          <h1>No Orders Yet!</h1>
        ) : (
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                {Array.from({ length: 10 }).map((_, index) => (
                  <th key={index}>Title</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                {Array.from({ length: 10 }).map((_, index) => (
                  <td key={index}>Table cell {index}</td>
                ))}
              </tr>
              <tr>
                <td>2</td>
                {Array.from({ length: 10 }).map((_, index) => (
                  <td key={index}>Table cell {index}</td>
                ))}
              </tr>
              <tr>
                <td>3</td>
                {Array.from({ length: 10 }).map((_, index) => (
                  <td key={index}>Table cell {index}</td>
                ))}
              </tr>
              <tr>
                <td>4</td>
                {Array.from({ length: 10 }).map((_, index) => (
                  <td key={index}>Table cell {index}</td>
                ))}
              </tr>
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
}

export default MainPage;
