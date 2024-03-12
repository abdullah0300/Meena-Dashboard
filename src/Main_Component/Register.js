import React, { useState } from "react";
// import "./Choose.css";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { FiMinus } from "react-icons/fi";
import { Container, Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { BiShow, BiHide } from "react-icons/bi";
import { Link } from "react-router-dom";

function Register() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((preve) => !preve);
  };
  return (
    <div class=" ">
      {/* About Start */}
      <div className="container-fluid ">
        <div className="row">
          <div className="col-lg-6 bg-[#bd922980] p-4 h-screen hidden md:block">
            <Link to="/">
              <img
                src="https://ik.imagekit.io/2nuimwatr/WhatsApp_Image_2024-01-01_at_12.04.01_AM-removebg-preview.png?updatedAt=1704471063051"
                alt=""
                class="h-[75px] w-[75px]"
              />
            </Link>

            <h3 class="text-white text-2xl font-semibold text-wrap  hidden md:block w-50 ">
              Welcome to Vaping CIRCLE!
            </h3>
          </div>

          <div className="col-lg-6 rounded-[24px] lg:ml-[-90px] p-2 md:pt-5 md:pb-5 bg-white  z-0 relative">
            <img
              src="https://ik.imagekit.io/p2slevyg1/41098deb-a489-4df6-acd5-55e3bb05f5cb-removebg-preview.png?updatedAt=1705433981054"
              alt=""
              class="w-[350px] h-[450px] lg:ml-[300px] z-[1000] absolute  mt-44 bottom-5 right-[90%] hidden md:block"
              style={{ zIndex: 1000 }}
            />
            <h3 class=" text-3xl font-bold text-center pt-5 pl-2 md:pl-[5rem] pb-4">
              Create Your Account
            </h3>
            <div class="flex justify-center items-center pl-2 md:pl-[5rem]">
              <p class="flex justify-center items-center border p-2 mx-2 rounded-md">
                <FcGoogle class="mx-2 text-xl" />
                Sign up with Google
              </p>
              <p class="flex justify-center items-center border p-2 mx-2 rounded-md">
                <FaFacebookF class="mx-2 text-xl text-blue-800" />
                Sign up with Facebook
              </p>
            </div>
            <p class="flex justify-center items-center pt-3 pb-3 pl-2 md:pl-[5rem]">
              <FiMinus />
              OR
              <FiMinus />
            </p>
            <div class="pl-2 md:pl-[13%] ">
              <Form class="p-2">
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="">
                    <Form.Control type="text" placeholder="First Name" />
                  </Form.Group>

                  <Form.Group as={Col} controlId="">
                    <Form.Control type="text" placeholder="Last Name" />
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="">
                  <Form.Control type="email" placeholder="Email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="">
                  <Form.Select defaultValue="Select City">
                    <option selected hidden>
                      Select City
                    </option>
                    <option>...</option>
                    <option>...</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="">
                  <Form.Control type="text" placeholder="Post Code" />
                </Form.Group>

                <div className="flex mb-3 border rounded-md px-2 py-2 w-full  bg-nonfocus-within:outline-gray-700">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Password"
                    className="  w-full  border-none outline-none "
                    value={password}
                    required
                  />
                  <span
                    className="flex text-xl cursor-pointer"
                    onClick={handleShowPassword}
                  >
                    {showPassword ? <BiShow /> : <BiHide />}
                  </span>
                </div>

                <div className="flex mb-3  border rounded-md px-2 py-2 w-full  bg-nonfocus-within:outline-gray-700">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    className="  w-full  border-none outline-none "
                    required
                  />
                  <span
                    className="flex text-xl cursor-pointer"
                    onClick={handleShowConfirmPassword}
                  >
                    {showConfirmPassword ? <BiShow /> : <BiHide />}
                  </span>
                </div>

                <div class="flex mb-3">
                  <input
                    placeholder="DD"
                    className="flex mt-2 me-3  border rounded-md px-2 py-2 w-[70px]  bg-nonfocus-within:outline-gray-700"
                  />
                  <input
                    placeholder="MM"
                    className="flex mt-2 me-3  border rounded-md px-2 py-2 w-[70px]  bg-nonfocus-within:outline-gray-700"
                  />
                  <input
                    placeholder="YYYY"
                    className="flex mt-2 me-3  border rounded-md px-2 py-2 w-[70px]  bg-nonfocus-within:outline-gray-700"
                  />
                </div>

                <div class="flex flex-col justify-center items-center mt-5">
                  <button class="bg-[#59A0B8] text-white px-5  py-2 rounded-[24px]">
                    Create Account
                  </button>
                  <p class="text-[#000000]  p-2">
                    Already have an account{" "}
                    <Link to="/login">
                      <span class="text-[#8dc9cf] px-1 font-bold underline underline-offset-2">
                        Login
                      </span>
                    </Link>
                  </p>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
      {/* About End */}

      {/* <Footer /> */}
    </div>
  );
}

export default Register;
