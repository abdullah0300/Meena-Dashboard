import React from "react";
import DashboardNavbar from "./DashboardNavbar";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { apiUrl } from "../../data/env";
import { MdDeleteForever } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./AllCatogery.css"; // Import your CSS file
function chunkArray(array, size) {
  const chunkedArray = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArray.push(array.slice(i, i + size));
  }
  return chunkedArray;
}

const extractFileIds = (obj) => {
  const fileIds = [];

  const extract = (obj) => {
    for (const key in obj) {
      if (typeof obj[key] === "object") {
        extract(obj[key]); // Recursively call extract for nested objects
      } else {
        if (key === "fileId") {
          fileIds.push(obj[key]);
        }
      }
    }
  };

  extract(obj);

  return fileIds;
};

function AllCategory() {
  const nav = useNavigate();
  const [chunkedArr, setChunkedArr] = React.useState([]);
  const [allCategories, setAllCategories] = React.useState([]);

  const getAllCat = () => {
    axios
      .get(`${apiUrl}/api/v1/category`)
      .then((res) => {
        setChunkedArr(chunkArray(res.data.data, 4));
        setAllCategories(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    getAllCat();
  }, []);

  const handleDelete = (catId) => {
    const id = toast.loading("Deleting Category...");

    const [selectedCat] = allCategories.filter((cat) => cat._id === catId);
    let fileIds = extractFileIds(selectedCat);
    let bool = fileIds.length !== 0 ? true : false;

    if (bool)
      axios
        .post(`${apiUrl}/api/v1/delete/imagesBulk`, { fileIds })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));

    axios
      .delete(`${apiUrl}/api/v1/category/${catId}`)
      .then((res) => {
        console.log(res.data);
        getAllCat();
        toast.update(id, {
          render: "Deleted Category Successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <DashboardNavbar />
      <div>
        <div className="mt-24 absolute lg:left-[260px]">
          <div className="d-flex justify-between">
            <h2 className="text-xl font-bold mb-5 text-center">
              All Collection
            </h2>
            <Button
              onClick={() => nav("/dashboard/addCategory")}
              className="rounded-1 hover:bg-[#bd9229] p-1 font-semibold bg-[#bd9229] text-white text-[16px]  addbutton  end-0 m-4"
            >
              + Add Collection
            </Button>
          </div>
          <Container fluid className="my-5">
            {chunkedArr?.map((chunk, index) => (
              <Row className="mb-4" key={index}>
                {chunk.map((cat) => {
                  let url = "";
                  if (cat.image.url)
                    url = cat.image.url.replace(
                      "/category",
                      "/tr:ar-1-1,w-285.5/category"
                    );
                  else if (cat.image)
                    url = cat.image.replace(
                      "/category",
                      "/tr:ar-1-1,w-285.5/category"
                    );
                  else url = "";
                  return (
                    <Col key={cat._id}>
                      <div className="card " style={{ width: "15rem" }}>
                        <div className=" m-2 relative image-container ">
                          <img
                            style={{ width: "18rem", height: "14rem" }}
                            src={url}
                            loading="lazy"
                            alt={cat.name}
                            className="category-image"
                          />
                          <div className="overlay-buttons">
                            <MdDeleteForever
                              className="delete-icon"
                              onClick={() => handleDelete(cat._id)}
                            />
                            <button
                              onClick={() =>
                                nav(`/dashboard/editCategory/${cat._id}`)
                              }
                              className="edit-button"
                            >
                              Edit
                            </button>
                          </div>
                          <div className=" category-details ">
                            <p className="text-black font-semibold my-2 text-center text-[15px]">
                              {cat.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            ))}
          </Container>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AllCategory;
