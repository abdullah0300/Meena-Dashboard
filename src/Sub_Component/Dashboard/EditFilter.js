import React, { useState } from "react";
import DashboardNavbar from "./DashboardNavbar";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import { FiEdit } from "react-icons/fi";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { apiUrl } from "../../data/env";
import { useNavigate, useParams } from "react-router-dom";

function EditFilter() {
  const { filId, catId, catName } = useParams();

  const nav = useNavigate();

  // const [fetchedCategories, setFetchedCategories] = React.useState([]);
  // const [fetchedFilter, setFetchedFilter] = React.useState(null);

  React.useEffect(() => {
    const id = toast.loading("Fetching Data... Please Wait!");

    axios
      .get(`${apiUrl}/api/v1/filter/${filId}`)
      .then((res) => {
        // setFetchedFilter(res.data.data);
        toast.update(id, {
          render: "Successfully Fetched Data!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });

        setFilterName(res.data.data.name);
        setFilterAlternateName(res.data.data.alternateName);
        setPriorityNum(res.data.data.priority);
        setShowInNavbar(res.data.data.showNavbar);
        setShowInFilterbar(res.data.data.showFilterbar);
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
  }, []);

  // hooks for post request
  const [filterName, setFilterName] = React.useState("");
  const [filterAlternateName, setFilterAlternateName] = React.useState("");
  const [priorityNum, setPriorityNum] = React.useState(1);
  const [showInNavbar, setShowInNavbar] = React.useState("true");
  const [showInFilterbar, setShowInFilterbar] = React.useState("true");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmitEditedFilter = (e) => {
    e.preventDefault();

    const id = toast.loading("Please wait...");

    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const payload = {
      name: filterName,
      alternateName: filterAlternateName,
      priority: priorityNum,
      showNavbar: showInNavbar === "true" ? true : false,
      showFilterbar: showInFilterbar === "true" ? true : false,
    };

    axios
      .patch(`${apiUrl}/api/v1/filter/${filId}`, payload, config)
      .then((res) => {
        // setIsLoadingState(false);
        console.log(res.data);
        toast.update(id, {
          render: "Edited Filter Successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        nav("/dashboard/allSubCollections");
      })
      .catch((err) => {
        console.log(err);
        toast.update(id, {
          render:
            err.response?.data?.message ||
            "Error Occured! See more using console!",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      });
  };

  return (
    <div>
      <DashboardNavbar />
      <div>
        <div class=" mt-24 absolute lg:left-[260px] z-5">
          <Container class="">
            <h2 class="font-bold text-xl">Add Sub Collection</h2>
            <Row class="">
              <Col md={4}>
                <Form.Group as={Col} controlId="" sm={4} className=" mt-3">
                  <div class="border rounded-md w-[20rem] h-[13rem] flex flex-col justify-center items-center">
                    <input
                      type="file"
                      id="fileInput"
                      accept="image/png, image/jpeg"
                      class="text-center"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />

                    <label htmlFor="fileInput">
                      <FiEdit
                        icon={faUpload}
                        class="text-2xl text-center "
                        style={{ cursor: "pointer", margin: "0 auto" }}
                      />
                      <span>Upload an Image</span>
                      <br />
                    </label>

                    {selectedFile && (
                      <p class="w-75">Selected File: {selectedFile.name}</p>
                    )}
                  </div>
                </Form.Group>
                {/* <Row>
                  <Col>
                    <Form.Group as={Col} controlId="" sm={4} className="">
                      <Form.Label class="text-[#707070] font-semibold py-2"></Form.Label>
                      <Form.Control
                        type="text"
                        style={{ height: "40px", width: "45px" }}
                      />
                      <div
                        class="absolute text-center "
                        style={{ marginTop: -28 }}
                      >
                        <p class=" px-3 text-[#707070]">
                          <FiEdit />
                        </p>
                      </div>
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group as={Col} controlId="" sm={4} className="">
                      <Form.Label class="text-[#707070] font-semibold py-2"></Form.Label>
                      <Form.Control
                        type="text"
                        style={{ height: "40px", width: "45px" }}
                      />
                      <div
                        class="absolute text-center "
                        style={{ marginTop: -28 }}
                      >
                        <p class=" px-3 text-[#707070]">
                          <FiEdit />
                        </p>
                      </div>
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group as={Col} controlId="" sm={4} className="">
                      <Form.Label class="text-[#707070] font-semibold py-2"></Form.Label>
                      <Form.Control
                        type="text"
                        style={{ height: "40px", width: "45px" }}
                      />
                      <div
                        class="absolute text-center "
                        style={{ marginTop: -28 }}
                      >
                        <p class=" px-3 text-[#707070]">
                          <FiEdit />
                        </p>
                      </div>
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group as={Col} controlId="" sm={4} className="">
                      <Form.Label class="text-[#707070] font-semibold py-2"></Form.Label>
                      <Form.Control
                        type="text"
                        style={{ height: "40px", width: "45px" }}
                      />
                      <div
                        class="absolute text-center "
                        style={{ marginTop: -28 }}
                      >
                        <p class=" px-3 text-[#707070]">
                          <FiEdit />
                        </p>
                      </div>
                    </Form.Group>
                  </Col>
                </Row> */}
              </Col>

              <Col md={8}>
                <Form>
                  <Row className="mb-3 lg:px-16 mt-3">
                    <Form.Group as={Col} controlId="">
                      <Form.Label class="text-[#707070] font-semibold py-2">
                        Select Collection
                      </Form.Label>
                      <Form.Select disabled aria-label="Default select example">
                        <option>{catName}</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="">
                      <Form.Label class="text-[#707070]  font-semibold py-2">
                        Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={filterName}
                        onChange={(e) => setFilterName(e.target.value)}
                      />
                    </Form.Group>
                  </Row>

                  <Row className="mb-3 lg:px-16 mt-3">
                    <Form.Group as={Col} controlId="">
                      <Form.Label class="text-[#707070]  font-semibold py-2">
                        Priority Number
                      </Form.Label>
                      <Form.Control
                        type="number"
                        min={1}
                        value={priorityNum}
                        onChange={(e) => setPriorityNum(Number(e.target.value))}
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="">
                      <Form.Label class="text-[#707070] font-semibold py-2">
                        Show in Navbar
                      </Form.Label>
                      <Form.Select
                        value={showInNavbar}
                        onChange={(e) => setShowInNavbar(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option value={"true"}>Yes</option>
                        <option value={"false"}>No</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="">
                      <Form.Label class="text-[#707070] font-semibold py-2">
                        Show in Filterbar
                      </Form.Label>
                      <Form.Select
                        value={showInFilterbar}
                        onChange={(e) => setShowInFilterbar(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option value={"true"}>Yes</option>
                        <option value={"false"}>No</option>
                      </Form.Select>
                    </Form.Group>
                  </Row>

                  {/* <Row className="mb-3 lg:px-16 mt-3">
                    <Form.Group as={Col} controlId="" md={2}>
                      <Form.Label class="text-[#707070]  font-semibold py-2">
                        New Options
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={typedOption}
                        onChange={(e) => setTypedOption(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="">
                      <button
                        class="rounded-1 p-2 mt-[4rem] bg-[#bd9229] text-white"
                        onClick={(e) => {
                          e.preventDefault();
                          setOptionsArray((arr) => [...arr, typedOption]);
                          setTypedOption("");
                        }}
                      >
                        Add Option
                      </button>
                    </Form.Group>

                    <Form.Group
                      as={Col}
                      controlId=""
                      md={4}
                      style={{ marginTop: 15 }}
                    >
                      <Form.Label class="text-[#707070]  font-semibold py-2">
                        Current Options
                      </Form.Label>
                      <Form.Select
                        onChange={(e) => setSelectedOption(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option value={""}></option>
                        {optionsArray?.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="">
                      <button
                        class="rounded-1 p-2  text-white"
                        style={{ marginTop: 37 }}
                        onClick={(e) => {
                          e.preventDefault();
                          if (optionsArray.length >= 1) {
                            const newArr = [...optionsArray];
                            newArr.splice(
                              optionsArray.indexOf(selectedOption),
                              1
                            );
                            setOptionsArray(newArr);
                            setSelectedOption("");
                          }
                        }}
                      >
                        {" "}
                        <RiDeleteBinLine class="text-[#707070] mt-[1rem] text-2xl" />
                      </button>
                    </Form.Group>
                  </Row> */}
                </Form>
              </Col>
            </Row>
            <button
              onClick={handleSubmitEditedFilter}
              class="rounded-1 p-2 w-32 font-semibold   mt-4 bg-[#bd9229] text-white"
            >
              Submit
            </button>
          </Container>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default EditFilter;
