import React, { useState } from "react";
import DashboardNavbar from "./DashboardNavbar";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { RiDeleteBinLine } from "react-icons/ri";

import { FiEdit } from "react-icons/fi";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { apiUrl } from "../../data/env";

function AddFlavour() {
  // hooks for post request
  const [selectedOption, setSelectedOption] = React.useState("");
  const [typedOption, setTypedOption] = React.useState("");
  const [subFlavoursArray, setSubFlavoursArray] = React.useState([]);
  const [filterName, setFilterName] = React.useState("");
  const [priorityNum, setPriorityNum] = React.useState(1);
  const [available, setAvailable] = React.useState("true");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadingImage, setUploadingImage] = React.useState(false);

  const handleSubmitNewFilter = (e) => {
    e.preventDefault();

    const subFlavoursObjArray = subFlavoursArray
      .map((el) => {
        return {
          name: el,
        };
      })
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name));

    const id = toast.loading("Please wait...");

    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const payload = {
      name: filterName,
      priority: priorityNum,
      image: "img.jpeg",
      available: available === "true" ? true : false,
      subFlavours: subFlavoursObjArray,
    };
    console.log(payload);

    axios
      .post(`${apiUrl}/api/v1/flavour`, payload, config)
      .then((res) => {
        console.log(res.data);

        toast.update(id, {
          render: "Created Flavour Successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });

        if (uploadingImage) handleUploadImage(res.data.data._id);

        setSelectedOption("");
        setFilterName("");
        setPriorityNum(1);
        setAvailable("true");
        setSubFlavoursArray([]);
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

  const handleUploadImage = (fId) => {
    const id = toast.loading("Uploading Flavour Image...");
    let formData = new FormData();
    formData.append("image", selectedFile);

    axios
      .post(`${apiUrl}/api/v1/flavour/imageUpload?flavourId=${fId}`, formData)
      .then((res) => {
        console.log(res.data);
        console.log("uploaded image");

        toast.update(id, {
          render: "Uploaded Flavour Image Successfully!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });

        setSelectedFile(null);
        setUploadingImage(false);
      })
      .catch((err) => {
        console.log(err);
        toast.update(id, {
          render:
            err.response?.data?.message ||
            "Flavour Image Upload Error! See more using console!",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setUploadingImage(true);
  };

  return (
    <div>
      <DashboardNavbar />
      <div>
        <div class=" mt-24 absolute lg:left-[260px] z-5">
          <Container class="">
            <h2 class="font-bold text-xl">Add Flavour</h2>
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
                        Available
                      </Form.Label>
                      <Form.Select
                        value={available}
                        onChange={(e) => setAvailable(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option value={"true"}>Yes</option>
                        <option value={"false"}>No</option>
                      </Form.Select>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3 lg:px-16 mt-3">
                    <Form.Group as={Col} controlId="" md={2}>
                      <Form.Label class="text-[#707070]  font-semibold py-2">
                        New Subflavour
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
                          setSubFlavoursArray((arr) => [...arr, typedOption]);
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
                        Current Subflavours
                      </Form.Label>
                      <Form.Select
                        onChange={(e) => setSelectedOption(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option value={""}></option>
                        {subFlavoursArray
                          ?.slice()
                          .sort((a, b) => a.localeCompare(b))
                          .map((opt, i) => (
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
                          if (subFlavoursArray.length >= 1) {
                            const newArr = [...subFlavoursArray];
                            newArr.splice(
                              subFlavoursArray.indexOf(selectedOption),
                              1
                            );
                            setSubFlavoursArray(newArr);
                            setSelectedOption("");
                          }
                        }}
                      >
                        {" "}
                        <RiDeleteBinLine class="text-[#707070] mt-[1rem] text-2xl" />
                      </button>
                    </Form.Group>
                  </Row>
                </Form>
              </Col>
            </Row>
            <button
              onClick={handleSubmitNewFilter}
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

export default AddFlavour;
