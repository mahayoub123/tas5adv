import React, { useState } from "react";
import "./SignUpForm.css";
import Form from "react-bootstrap/Form";
import logo from "../../assets/images/Logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SignUpForm: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const generatedUsername =
      `${formData.first_name}_${formData.last_name}`.toLowerCase();

    const data = new FormData();
    data.append("first_name", formData.first_name);
    data.append("last_name", formData.last_name);
    data.append("user_name", generatedUsername);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("password_confirmation", formData.password_confirmation);
    if (profileImage) {
      data.append("profile_image", profileImage);
    }

    try {
      const response = await axios.post(
        "https://web-production-3ca4c.up.railway.app/api/register",
        data,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Registered:", response.data);
      navigate("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Registration error:", error.response?.data);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="formStyle">
        <img src={logo} alt="logo" className="imgContainer" />
        <p className="parStyle">SIGN UP</p>
        <p className="secondParStyle">
          Fill in the following fields to create an account.
        </p>

        <Form.Group className="inputContainer">
          <Form.Label className="inputStyle">First Name</Form.Label>
          <Form.Control
            name="first_name"
            placeholder="First Name"
            type="text"
            onChange={handleChange}
            className="inputDecoration"
          />
          <Form.Label className="inputStyle">Last Name</Form.Label>
          <Form.Control
            name="last_name"
            placeholder="Last Name"
            type="text"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="inputEmailStyle">
          <Form.Label className="inputStyle">Email</Form.Label>
          <Form.Control
            name="email"
            placeholder="Enter Your Email"
            type="email"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="inputContainer">
          <Form.Label className="inputStyle">Password</Form.Label>
          <Form.Control
            name="password"
            placeholder="Enter Your Password"
            type="password"
            onChange={handleChange}
            className="inputDecoration"
          />
          <Form.Label className="inputStyle">Confirm Password</Form.Label>
          <Form.Control
            name="password_confirmation"
            placeholder="Re-enter Your Password"
            type="password"
            onChange={handleChange}
            className="inputDecoration"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label className="inputStyle">Profile Image</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>

        <button type="submit" className="formBtnStyle">
          SIGN UP
        </button>

        <p className="secondParStyle">
          Do you have an account?{" "}
          <a href="/login" className="linkStyle">
            Sign in
          </a>
        </p>
      </div>
    </form>
  );
};

export default SignUpForm;
