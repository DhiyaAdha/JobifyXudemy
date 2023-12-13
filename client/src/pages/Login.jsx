import { Form, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";

const Login = () => {
  return (
    <Wrapper>
      <form className="form" action="">
        <Logo />
        <h4>Login</h4>
        <FormRow type='email' name='email'
          defaultValue='dha@gmail.com' />
        <FormRow type='password' name='password' defaultValue='dha123'/>
      <button type="submit" className="btn btn-block">Submit</button>
      <button type="submit" className="btn btn-block">Explore the App</button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
      </p>
      </form>
    </Wrapper>
  );
};

export default Login;
