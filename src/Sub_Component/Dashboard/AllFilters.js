import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./allproduct.css";
import DashboardNavbar from "./DashboardNavbar";
import axios from "axios";
import { apiUrl } from "../../data/env";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";

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

function AllFilters() {
  const nav = useNavigate();

  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [allFilters, setAllFilters] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [chunkedArr, setChunkedArr] = useState([]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const getAllCat = () => {
    const id = toast.loading("Fetching Collections...");
    axios
      .get(`${apiUrl}/api/v1/category`)
      .then((res) => {
        setAllCategories(res.data.data);
        toast.update(id, {
          render: "Loaded Collections Successfully!",
          type: "success",
          isLoading: false,
          autoClose: 1500,
        });
      })
      .catch((err) => console.log(err));
  };

  const getAllFilters = () => {
    const id = toast.loading("Fetching Data...");
    axios
      .get(`${apiUrl}/api/v1/filter`)
      .then((res) => {
        setAllFilters(res.data.data);
        toast.update(id, {
          render: "Loaded Data Successfully!",
          type: "success",
          isLoading: false,
          autoClose: 1500,
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllCat();
    getAllFilters();
  }, []);

  const handleDelete = (filterId) => {
    const id = toast.loading("Deleting Filter...");

    const [selectedFilter] = allFilters.filter((fil) => fil._id === filterId);
    let fileIds = extractFileIds(selectedFilter);
    let bool = fileIds.length !== 0 ? true : false;

    if (bool)
      axios
        .post(`${apiUrl}/api/v1/delete/imagesBulk`, { fileIds })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));

    axios
      .delete(`${apiUrl}/api/v1/filter/${filterId}`)
      .then((res) => {
        getAllFilters();
        handleCategoryChange("");
        handleFilterProducts("");
        toast.update(id, {
          render: "Deleted Filter Successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      })
      .catch((err) => console.log(err));
  };

  const handleFilterProducts = (catId) => {
    const filteredProducts = allFilters.filter(
      (filter) => filter.categoryId === catId
    );
    setChunkedArr(chunkArray(filteredProducts, 4));
  };

  return (
    <div>
      <DashboardNavbar />
      <div className="mt-24 absolute lg:left-[250px]">
        <div className="d-flex justify-between">
          <h2 className="text-xl font-bold mb-5 text-center">
            All Sub-Collections
          </h2>
          <button
            onClick={() => nav("/dashboard/addSubCollections")}
            className="rounded-1 p-1 font-semibold bg-[#bd9229] text-white text-[16px] position-fixed end-0 m-4"
          >
            + Add Sub Collection
          </button>
        </div>
        <div className="dropdown">
          <button
            className="btn bg-[#bd9229] btn-light text-white dropdown-toggle"
            type="button"
            id="categoryDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {selectedCategoryName || "Select Collection"}
          </button>
          <ul className="dropdown-menu" aria-labelledby="categoryDropdown">
            {allCategories.map((cat) => (
              <li key={cat._id}>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    handleCategoryChange(cat._id);
                    setSelectedCategoryName(cat.name);
                    handleFilterProducts(cat._id);
                  }}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <Container fluid className="my-5">
          {chunkedArr?.map((four, rowIndex) => (
            <Row key={rowIndex} className=" mb-3">
              {four.map((el) => (
                <Col key={el._id} className="border p-3 rounded mb-2">
                  <div className="d-flex flex-column gap-3">
                    <img
                      style={{ width: "18rem", height: "14rem" }}
                      src={el.image?.url || ""}
                      loading="lazy"
                      alt={el.name}
                      className="category-image"
                    />
                    <p className="text-black font-semibold text-[12px]">
                      {el.name}
                    </p>
                    <div className="d-flex justify-between w-100 gap-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(el._id);
                        }}
                        className="rounded-1 p-1 w-24 font-semibold bg-[#bd9229]  text-white text-[14px]"
                      >
                        Delete
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          nav(
                            `/dashboard/SubCollections/${selectedCategory.replaceAll(
                              "/",
                              "@"
                            )}/${selectedCategoryName.replaceAll("/", "@")}/${
                              el._id
                            }`
                          );
                        }}
                        className="rounded-1 p-1 w-24 font-semibold bg-[#bd9229] text-white text-[14px]"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          ))}
        </Container>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default AllFilters;
