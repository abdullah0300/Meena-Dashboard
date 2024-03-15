import React, { useState } from "react";
import DashboardNavbar from "./DashboardNavbar";
import { Container, Row, Col, Button } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { FiEdit } from "react-icons/fi";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { apiUrl } from "../../data/env";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";

function EditCategory() {
  // pre loaded data for editing purposes
  const { catId } = useParams();
  const nav = useNavigate();

  const [currentCategory, setCurrentCategory] = useState(null);

  React.useEffect(() => {
    const id = toast.loading("Please wait...");

    axios
      .get(`${apiUrl}/api/v1/category/${catId}`)
      .then((res) => {
        setCurrentCategory(res.data.data);
        setAvailableRetail(`${res.data.data.availableRetail}`);
        setAvailableWholesale(`${res.data.data.availableWholesale}`);
        setCategoryName(`${res.data.data.name}`);
        setDescription(`${res.data.data.description}`);
        setPriorityNum(`${res.data.data.priority}`);

        toast.update(id, {
          render: "Fetched Category Successfully",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });
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
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [uploadingImage, setUploadingImage] = React.useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setUploadingImage(true);
  };
  const handleFileChange2 = (event) => {
    const file2 = event.target.files[0];
    setSelectedFile2(file2);
  };

  const handleUploadCategoryImage = (cId) => {
    let formData = new FormData();
    formData.append("image", selectedFile);

    return axios
      .post(`${apiUrl}/api/v1/category/imageUpload?categoryId=${cId}`, formData)
      .then((res) => {
        console.log(res.data);
        console.log("uploaded image");
        // alert("successfully uploaded image!");
        return true;
      })
      .catch((err) => {
        console.log(err);
        // alert("Could not upload image. ", `${err.message || "server error"}`);
        return false;
      });
  };

  // form value states
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [priorityNum, setPriorityNum] = useState(1);
  const [availableRetail, setAvailableRetail] = useState("true");
  const [availableWholesale, setAvailableWholesale] = useState("false");

  const handleEditNewCategory = (e) => {
    e.preventDefault();
    // setIsLoadingState(true);
    const id = toast.loading("Please wait...");

    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const payload = {
      name: categoryName,
      description,
      priority: priorityNum,
      availableRetail: availableRetail === "true" ? true : false,
      availableWholesale: availableWholesale === "true" ? true : false,
    };

    axios
      .patch(`${apiUrl}/api/v1/category/${catId}`, payload, config)
      .then((res) => {
        // setIsLoadingState(false);
        console.log(res.data);
        if (uploadingImage) {
          if (handleUploadCategoryImage(res.data.data._id)) {
            toast.update(id, {
              render: "Created Category Successfully & Uploaded Image",
              type: "success",
              isLoading: false,
              autoClose: 3000,
            });
          }
        } else {
          toast.update(id, {
            render: "Created Category Successfully (No Image Upload)",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
        }
        nav("/dashboard/all_category");
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
      <div class=" mt-24 absolute lg:left-[260px]  z-5">
        <Container>
          <h2 class="font-bold text-xl">Main Category</h2>
          <p class="font-bold mt-4">Add New Category</p>
          <Form sm={12}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="" sm={6}>
                <Form.Label class="text-[#707070] font-semibold py-2">
                  Name
                </Form.Label>
                <Form.Control
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </Form.Group>

              <Form.Group
                as={Col}
                controlId=""
                sm={4}
                className="hidden md:block"
              >
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
                  {/* <button
                    onClick={handleUploadCategoryImage}
                    class="rounded-1 p-2 w-32 font-semibold   mt-4 bg-[#bd9229] text-white"
                  >
                    Upload Image
                  </button> */}
                </div>
              </Form.Group>
            </Row>

            <Row className="mb-4" style={{ marginTop: -119 }}>
              <Form.Group
                as={Col}
                controlId=""
                sm={4}
                className="hidden md:block"
              >
                <Form.Label class="text-[#707070] font-semibold py-2">
                  Priority Number
                </Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  value={priorityNum}
                  onChange={(e) => setPriorityNum(Number(e.target.value))}
                />
              </Form.Group>
              <Form.Group
                as={Col}
                controlId=""
                sm={4}
                className="hidden md:block"
              >
                <input
                  type="file2"
                  id="fileInput"
                  accept="image/png, image/jpeg"
                  class="text-center"
                  style={{ display: "none" }}
                  onChange={handleFileChange2}
                />

                <label htmlFor="fileInput" class="mt-[13px]">
                  <span class="text-[#707070] font-semibold py-2 mb-4">
                    Icon
                  </span>

                  <FiEdit
                    icon={faUpload}
                    class="text-4xl text-center border rounded-md py-2 px-2"
                    style={{ cursor: "pointer", margin: "0 auto" }}
                  />
                  <br />
                </label>

                {selectedFile2 && (
                  <p class="w-75">Selected File: {selectedFile2.name}</p>
                )}

                {/* </div> */}
                {/* <Form.Label class="text-[#707070] font-semibold py-2">
                  Choose an icon
                </Form.Label>
                <Form.Control
                  type="file"
                  style={{ height: "40px", width: "45px" }}
                  accept="image/png, image/jpeg"
                />
                <div class="absolute text-center " style={{ marginTop: -28 }}>
                  <button
                    class="rounded-1 p-2 bg-[#bd9229] text-white"
                    style={{ marginTop: 37 }}
                  >
                    Upload Selected Icon
                  </button> */}
                {/* <p class=" px-3 text-[#707070]">
                    <FiEdit />
                  </p> */}
                {/* </div> */}
              </Form.Group>
            </Row>

            {/* small screen  */}
            <Row className="mb-4 ">
              <Form.Group
                as={Col}
                controlId=""
                sm={4}
                className="mt-16 py-3 block md:hidden "
              >
                <Form.Label class="text-[#707070] font-semibold py-2">
                  Priority Number
                </Form.Label>
                <Form.Control type="number" />
              </Form.Group>
              <Form.Group
                as={Col}
                controlId=""
                sm={4}
                className="block md:hidden "
              >
                <input
                  type="file2"
                  id="fileInput"
                  accept="image/png, image/jpeg"
                  class="text-center"
                  style={{ display: "none" }}
                  onChange={handleFileChange2}
                />

                <label htmlFor="fileInput" class="mt-[13px]">
                  <span class="text-[#707070] font-semibold py-2 mb-4">
                    Icon
                  </span>

                  <FiEdit
                    icon={faUpload}
                    class="text-4xl text-center border rounded-md py-2 px-2"
                    style={{ cursor: "pointer", margin: "0 auto" }}
                  />
                  <br />
                </label>

                {selectedFile2 && (
                  <p class="w-75">Selected File: {selectedFile2.name}</p>
                )}
              </Form.Group>
            </Row>

            <Row className="mb-3">
              {/* <Form.Group as={Col} controlId="">
                <label for="" class="text-[#707070] font-semibold py-2">
                  Filters
                </label>
                <select id="" class="form-select">
                  <option muted hidden selected>
                    Choose Filters
                  </option>
                  <option>Chocolate</option>
                  <option>Ice Cream</option>
                  <option>Honey</option>
                </select>
              </Form.Group> */}
              {/* <Form.Group as={Col} controlId="">
                <Button
                  onClick={handleShow}
                  class="bg-[#59A0B8] text-white mt-[35px] px-5 lg:text-xl font-semibold  py-2 rounded "
                >
                  Varients
                </Button>
              </Form.Group> */}
              <Form.Group as={Col} controlId="">
                <Form.Label class="text-[#707070] font-semibold py-2">
                  Available For Retail
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={availableRetail}
                  onChange={(e) => setAvailableRetail(e.target.value)}
                >
                  <option value={"true"}>Yes</option>
                  <option value={"false"}>No</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="">
                <Form.Label class="text-[#707070] font-semibold py-2">
                  Available For Wholesale
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={availableWholesale}
                  disabled
                  // onChange={(e) => setAvailableWholesale(e.target.value)}
                >
                  <option value={"true"}>Yes</option>
                  <option value={"false"}>No (Upgrade Plan)</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} controlId="" className="block md:hidden">
                <Form.Label class="text-[#707070] font-semibold py-2">
                  Filters
                </Form.Label>
                <Form.Control />
              </Form.Group>
            </Row>

            <label class="text-[#707070] font-semibold py-2">Description</label>

            <FloatingLabel controlId="floatingTextarea2" label="">
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FloatingLabel>

            <Row>
              <Form.Group
                as={Col}
                controlId=""
                sm={4}
                className="block md:hidden mt-4"
              >
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
            </Row>

            <div class="flex flex-col justify-start items-start mt-3 mb-2 ">
              <button
                class="bg-[#59A0B8] text-white px-5 lg:text-xl font-semibold  py-2 rounded "
                onClick={handleEditNewCategory}
              >
                Submit
              </button>
            </div>
          </Form>
        </Container>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Varients</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>input 1</Form.Label>
              <Form.Control placeholder="input1" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>input 2</Form.Label>
              <Form.Control placeholder="input2" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <button
              onClick={handleClose}
              class="bg-[#59A0B8] text-white px-5 lg:text-xl font-semibold  py-2 rounded "
            >
              Save Changes
            </button>
          </Modal.Footer>
        </Modal>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default EditCategory;
