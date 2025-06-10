import "./SignUpForm.css";
import Form from "react-bootstrap/Form";
import logo from "../../assets/images/Logo.png";
import axios from "axios";

const registerUser = async () => {
  try {
    const response = await axios.post(
      "https://web-production-3ca4c.up.railway.app/api/register",
      {
        name: "focal_x",
        email: "focal@gmail.com",
        password: "123123123",
        password_confirmation: "123123123",
      }
    );

    console.log("Registered successfully:", response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Registration failed:", error.response?.data);
    } else {
      console.error("Unexpected error:", error);
    }
  }
};
const SignUpForm = () => {
  return (
    <form>
      <div className="formStyle">
        <>
          <img src={logo} alt="logo" className="imgContainer" />
          <p className="parStyle">SIGN UP</p>
          <p className="secondParStyle">
            Fill in the following fields to create an account.
          </p>
          <div className="inputContainer">
            <Form.Label htmlFor="inputPassword5" className="inputStyle">
              Name
            </Form.Label>
            <Form.Control
              placeholder="First Name"
              type="text"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
              className="inputDecoration"
            />
            <Form.Text id="passwordHelpBlock" muted></Form.Text>
            <Form.Label
              htmlFor="inputPassword5"
              className="inputStyle"
            ></Form.Label>
            <Form.Control
              placeholder="Last Name"
              type="text"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
            />
            <Form.Text id="passwordHelpBlock" muted></Form.Text>
          </div>
          <div className="inputEmailStyle">
            <Form.Label htmlFor="inputPassword5" className="inputStyle">
              Email
            </Form.Label>
            <Form.Control
              placeholder="Enter Your Email"
              type="email"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
            />
            <Form.Text id="passwordHelpBlock" muted></Form.Text>
          </div>
          <div className="inputContainer">
            <Form.Label htmlFor="inputPassword5" className="inputStyle">
              Password
            </Form.Label>
            <Form.Control
              placeholder="Enter Your Password"
              type="password"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
              className="inputDecoration"
            />
            <Form.Text id="passwordHelpBlock" muted></Form.Text>
            <Form.Label
              htmlFor="inputPassword5"
              className="inputStyle"
            ></Form.Label>
            <Form.Control
              placeholder="RE-enter Your Password"
              type="password"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
              className="inputDecoration"
            />
            <Form.Text id="passwordHelpBlock" muted></Form.Text>
          </div>
          <Form.Label htmlFor="inputPassword5" className="inputStyle">
            Profile Image
          </Form.Label>
          <Form.Control
            type="file"
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
          />
          <Form.Text id="passwordHelpBlock" muted></Form.Text>
        </>
        <button className="formBtnStyle" onClick={registerUser}>
          SIGN UP
        </button>
        <p className="secondParStyle">
          Do you have an account?{" "}
          <button className="linkStyle">
            <a href="/login">Sign in</a>
          </button>
        </p>
      </div>
    </form>
  );
};

export default SignUpForm;
