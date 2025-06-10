import Form from "react-bootstrap/Form";
import logo from "../../assets/images/Logo.png";
import "./LogInForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function LogInForm() {
  const [email, setEmail] = useState<string>("focal@gmail.com");
  const [password, setPassword] = useState<string>("123123123");
  const navigate = useNavigate();

  const logIn = async () => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const response = await axios.post(
        "https://web-production-3ca4c.up.railway.app/api/login",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Login success:", response.data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };
  return (
    <div className="formStyle">
      <>
        <img src={logo} alt="logo" className="imgContainer" />
        <p className="parStyle">SIGN IN</p>
        <p className="secondParStyle">
          Enter your credentials to access your account
        </p>
        <Form.Label htmlFor="inputPassword5" className="inputStyle">
          Email
        </Form.Label>
        <Form.Control
          placeholder="Enter Your Email"
          type="email"
          id="inputPassword5"
          aria-describedby="passwordHelpBlock"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="inputDecoration"
        />
        <Form.Text id="passwordHelpBlock" muted></Form.Text>

        <Form.Label htmlFor="inputPassword5" className="inputStyle">
          Password
        </Form.Label>
        <Form.Control
          placeholder="Enter Your Password"
          type="password"
          id="inputPassword5"
          aria-describedby="passwordHelpBlock"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="inputDecoration"
        />
        <Form.Text id="passwordHelpBlock" muted></Form.Text>
      </>
      <button className="formBtnStyle" onClick={logIn}>
        SIGN IN
      </button>
      <p className="secondParStyle">
        Don’t have an account?
        <button className="linkStyle">
          <a href="/signup">Create One</a>
        </button>
      </p>
    </div>
  );
}

export default LogInForm;
