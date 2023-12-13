import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo } from "../components";
import FormRow from "../components/FormRow";

const Register = () => {
  return (
    <Wrapper>
      <form className="form">
        <Logo />
        <h4>Register Page</h4>
        <FormRow type='text' name='name' defaultValue='dhiya' />
        <FormRow type='text' name='lastName' labelText='last-name' defaultValue='adha' />
        <FormRow type='text' name='location' defaultValue='earth' />
        <FormRow type='email' name='email' defaultValue='dhiya@gmail.com' />
        <FormRow type='password' name='password' defaultValue='dhiya123' />
        <button type="submit" className="btn btn-block">
          Submit
        </button>
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
