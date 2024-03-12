import React, { useState } from "react";
import DashboardNavbar from "./DashboardNavbar";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
// import { RiDeleteBinLine } from "react-icons/ri";

import { FiEdit } from "react-icons/fi";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { apiUrl } from "../../data/env";
import { useParams } from "react-router-dom";

function EditOffer() {
  const { offerId } = useParams();

  React.useEffect(() => {
    const id = toast.loading("Fetching Data... Please Wait!");

    axios
      .get(`${apiUrl}/api/v1/offer/${offerId}`)
      .then((res) => {
        // setFetchedFilter(res.data.data);
        toast.update(id, {
          render: "Successfully Fetched Data!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });

        setOfferName(res.data.data.name);
        setAlternateName(res.data.data.alternateName);
        setPriorityNum(res.data.data.priority);
        setAvailable(`${res.data.data.available}`);
        setProductQuantity(res.data.data.productQuantity);
        setDiscountedPrice(res.data.data.discountedPrice);
        setImgUrl(res.data.data.image);
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
  const [offerName, setOfferName] = React.useState("");
  const [alternateName, setAlternateName] = React.useState("");
  const [priorityNum, setPriorityNum] = React.useState(1);
  const [available, setAvailable] = React.useState("true");
  const [productQuantity, setProductQuantity] = React.useState(null);
  const [discountedPrice, setDiscountedPrice] = React.useState(null);

  const [imgUrl, setImgUrl] = React.useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadingImage, setUploadingImage] = React.useState(false);

  const handleSubmitNewOffer = (e) => {
    e.preventDefault();

    const id = toast.loading("Please wait...");

    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const payload = {
      name: offerName,
      alternateName,
      priority: priorityNum,
      available: available === "true" ? true : false,
      productQuantity,
      discountedPrice,
    };
    console.log(payload);

    axios
      .patch(`${apiUrl}/api/v1/offer/${offerId}`, payload, config)
      .then((res) => {
        console.log(res.data);

        toast.update(id, {
          render: "Created offer Successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });

        // if (uploadingImage) handleUploadImage(res.data.data._id);

        setOfferName("");
        setPriorityNum(1);
        setAvailable("true");
        setAlternateName("");
        setProductQuantity(0);
        setDiscountedPrice(0);
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

  const handleUploadImage = (offId) => {
    const id = toast.loading("Uploading offer Image...");
    let formData = new FormData();
    formData.append("image", selectedFile);

    axios
      .post(`${apiUrl}/api/v1/offer/imageUpload?offerId=${offId}`, formData)
      .then((res) => {
        console.log(res.data);
        console.log("uploaded image");

        toast.update(id, {
          render: "Uploaded offer Image Successfully!",
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
            "offer Image Upload Error! See more using console!",
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
            <h2 class="font-bold text-xl">Edit offer</h2>
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
                {imgUrl ? (
                  <img
                    src={imgUrl?.url.replace(
                      "/offer",
                      "/tr:ar-1-1,w-285.5/offer"
                    )}
                    alt="offer img"
                    className="mt-2 m-auto"
                  />
                ) : null}
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
                        value={offerName}
                        onChange={(e) => setOfferName(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="">
                      <Form.Label class="text-[#707070]  font-semibold py-2">
                        Alternate Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={alternateName}
                        onChange={(e) => setAlternateName(e.target.value)}
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
                    <Form.Group as={Col} controlId="">
                      <Form.Label class="text-[#707070]  font-semibold py-2">
                        Product Quantity
                      </Form.Label>
                      <Form.Control
                        type="number"
                        min={1}
                        value={productQuantity}
                        onChange={(e) =>
                          setProductQuantity(Number(e.target.value))
                        }
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="">
                      <Form.Label class="text-[#707070]  font-semibold py-2">
                        Discounted Price
                      </Form.Label>
                      <Form.Control
                        type="number"
                        min={1}
                        value={discountedPrice}
                        onChange={(e) =>
                          setDiscountedPrice(Number(e.target.value))
                        }
                      />
                    </Form.Group>
                  </Row>
                </Form>
              </Col>
            </Row>
            <button
              onClick={handleSubmitNewOffer}
              class="rounded-1 p-2 w-32 font-semibold   mt-4 bg-[#bd9229] text-white"
            >
              Submit
            </button>
          </Container>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default EditOffer;
