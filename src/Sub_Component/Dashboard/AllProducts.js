import { useState } from "react";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./allproduct.css";
import DashboardNavbar from "./DashboardNavbar";
import axios from "axios";
import { apiUrl } from "../../data/env";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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

function AllProducts() {
  const nav = useNavigate();

  const [query, setQuery] = useState("");

  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const [chunkedArr, setChunkedArr] = React.useState([]);

  const getAllCat = () => {
    const id = toast.loading("Fetching Categories...");
    axios
      .get(`${apiUrl}/api/v1/category`)
      .then((res) => {
        setAllCategories(res.data.data);
        toast.update(id, {
          render: "Loaded Categories Successfully!",
          type: "success",
          isLoading: false,
          autoClose: 1500,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.update(id, {
          render:
            err.response?.data?.message || "Error! Try Again & See Console",
          type: "error",
          isLoading: false,
          autoClose: 3500,
        });
      });
  };

  const getAllProducts = () => {
    const id = toast.loading("Fetching Products...");
    axios
      .get(`${apiUrl}/api/v1/product`)
      .then((res) => {
        setAllProducts(res.data.data);
        // console.log(res.data.data);
        setChunkedArr(chunkArray(res.data.data, 3));
        toast.update(id, {
          render: "Loaded Products Successfully!",
          type: "success",
          isLoading: false,
          autoClose: 1500,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.update(id, {
          render:
            err.response?.data?.message || "Error! Try Again & See Console",
          type: "error",
          isLoading: false,
          autoClose: 3500,
        });
      });
  };

  React.useEffect(() => {
    setSelectedCategory("");
    setSelectedCategoryName("");
    setQuery("");
    getAllCat();
    getAllProducts();
  }, []);

  const handleDelete = (pId) => {
    const id = toast.loading("Deleting Product...");

    const [selectedProduct] = allProducts.filter((p) => p._id === pId);
    let fileIds = extractFileIds(selectedProduct);
    let bool = fileIds.length !== 0 ? true : false;

    if (bool)
      axios
        .post(`${apiUrl}/api/v1/delete/imagesBulk`, { fileIds })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));

    axios
      .delete(`${apiUrl}/api/v1/product/${pId}`)
      .then((res) => {
        console.log(res.data);
        getAllProducts();
        handleCategoryChange("");
        handleFilterProducts("");
        toast.update(id, {
          render: "Deleted Product Successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.update(id, {
          render:
            err.response?.data?.message || "Error! Try Again & See Console",
          type: "error",
          isLoading: false,
          autoClose: 3500,
        });
      });
  };

  const handleFilterProducts = (catId) => {
    const filteredProducts = allProducts.filter((p) => p.category === catId);
    setChunkedArr(chunkArray(filteredProducts, 3));
  };

  // Search Click Func
  const keys = ["name", "description"];

  const handleSearchFunc = (e) => {
    e.preventDefault();
    setSelectedCategoryName("");
    setSelectedCategory("");
    const searchedProds = allProducts.filter((p) =>
      keys.some((k) => p[k].toLowerCase().includes(query))
    );
    setChunkedArr(chunkArray(searchedProds, 3));
  };

  return (
    <div>
      <DashboardNavbar
        handleSearchClick={handleSearchFunc}
        setQuery={setQuery}
        query={query}
      />
      <div className="mt-24 absolute lg:left-[250px]">
        <div className="d-flex justify-between">
          <h2 className="text-xl font-bold mb-5 text-center">
            All Products{" "}
            {selectedCategoryName ? (
              <span className="text-l font-medium">
                ({selectedCategoryName})
              </span>
            ) : null}
          </h2>
          <button
            onClick={() => nav("/dashboard/addProduct")}
            className="rounded-1 p-1 font-semibold bg-[#bd9229] text-white text-[16px]  end-0 m-4 "
          >
            + Add New Product
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
            Select Category
          </button>
          <ul className="dropdown-menu" aria-labelledby="categoryDropdown">
            {allCategories?.map((cat) => (
              <li key={cat._id}>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    handleCategoryChange(cat._id);
                    setSelectedCategoryName(cat.name);
                    handleFilterProducts(cat._id);
                    setQuery("");
                  }}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div></div>

        <div>
          <Container fluid className="my-5">
            {chunkedArr?.map((four) => (
              <Row key={four[0]._id} className="mb-5">
                {four.map((el) => (
                  <Col key={el._id}>
                    <div className="card" style={{ width: "18rem" }}>
                      <div className="m-2 relative product-card">
                        <img
                          style={{ width: "18rem", height: "14rem" }}
                          src={el.coverImage?.url?.replace(
                            "/product",
                            "/tr:ar-1-1,w-285.5/product"
                          ) || el.coverImage?.replace(
                            "/product",
                            "/tr:ar-1-1,w-285.5/product"
                          ) || ""}
                          loading="lazy"
                          alt=""
                          className="product-image"
                        />
                        <div className="product-details1">
                          <div className="d-flex justify-between w-100">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleDelete(el._id);
                              }}
                              className="rounded-1 p-1 w-24 font-semibold bg-[#bd9229] text-white text-[14px] delete-button"
                            >
                              Delete
                            </button>
                            {selectedCategory ? (
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  nav(
                                    `/dashboard/editProduct/${selectedCategory}/${selectedCategoryName}/${el._id}`
                                  );
                                }}
                                className="rounded-1 p-1 w-24 font-semibold bg-[#bd9229] text-white text-[14px] edit-button"
                              >
                                Edit
                              </button>
                            ) : null}
                          </div>
                        </div>
                        <div className=" card-body product-info">
                          <p className="text-black font-semibold text-[16px]">
                            {el.name}
                          </p>
                          <p className="text-[#000000] font-semibold text-[12px]">
                            £{el.basePrice}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            ))}
          </Container>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AllProducts;
