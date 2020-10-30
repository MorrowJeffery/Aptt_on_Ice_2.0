import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser, refreshInstructor, refreshUser } from "../../../actions/authActions";
import classnames from "classnames";


class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (localStorage.getItem("jwtTokenUSR") !== null && (this.props.auth.isAuthenticated)) {
      this.props.history.push("/dashboard");
    } 
    // If the user has a user token but doesn't show them as authenticated -- fresh the state using the token
    // else if (localStorage.getItem("jwtTokenUSR") !== null && (!this.props.auth.isAuthenticated)) {
    //   this.props.refreshUser(localStorage.getItem("jwtTokenUSR"));
    //   this.props.history.push("/dashboard");
    // }
    // If logged in and user navigates to Login page, should redirect them to dashboard
    else if (localStorage.getItem("jwtTokenINS") !== null && (this.props.auth.isAuthenticated)) {
      this.props.history.push("/instructor/dashboard");
    }
    // If the user has a user token but doesn't show them as authenticated -- fresh the state using the token
    // else if ((localStorage.getItem("jwtTokenINS") !== null) && (!this.props.auth.isAuthenticated)) {
    //   this.props.refreshInstructor(localStorage.getItem("jwtTokenINS"));
    //   this.props.push("/instructor/dashboard");
    // }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.auth.isAuthenticated) {
      return(null)
    }
    if(nextProps.errors !== prevState.errors) {
      return({errors: nextProps.errors})
    }
    else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.auth.isAuthenticated!==this.props.auth.isAuthenticated){
      //Perform some operation here
      this.setState({errors: {}})
      this.props.history.push("/dashboard");
    }

    if(prevProps.errors!==this.props.errors){
      //Perform some operation here
      this.setState({errors: this.props.errors});
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser, refreshInstructor, refreshUser }
)(Login);
