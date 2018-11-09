import React, {Component} from 'react';

class LoginPage extends Component {
  render() {
    return (
      <div className="center">
        <div className="section"></div>
        <h5 className="indigo-text">Please, login into your account</h5>
        <div className="section"></div>

        <div className="container">
          <div className="z-depth-1 grey lighten-4 row"
               style={{display:"inline-block", padding:"32px 48px 0px 48px", border:"1px solid #EEE"}}>

            <form className="col s12" method="post">
              <div className="row">
                <div className="col s12">
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <input className="validate" type="email" name="email" id="email"/>
                  <label htmlFor="email" className="">Enter your email</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <input className="validate" type="password" name="password" id="password"/>
                  <label htmlFor="password" className="">Enter your password</label>
                </div>
                <label style={{float: "right"}}>
                  <a className="pink-text" href="./forget-password"><b>Forgot Password?</b></a>
                </label>
              </div>

              <br/>
              <div className={"center"}>
                <div className="row">
                  <a href="./find" type="submit" name="btn_login"
                     className="col s12 btn btn-large waves-effect indigo">Login
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
        <a href="./find">Create account</a>
      </div>
    );
  }
}


export default LoginPage;
