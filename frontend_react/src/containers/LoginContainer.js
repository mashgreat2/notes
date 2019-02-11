import React from 'react';

class NormalLoginForm extends React.Component {
  state = {
    email: "",
    password: "",
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("email: ", this.state.email)
  }

  handleEmailChange = event => {
    this.setState({
      email: event.target.value
    });
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="card mx-auto" style={{"width": "35rem",}}>
            <h1 className="card-header my-0">Login</h1>
            <div className="card-body">
              <form method="post" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="userEmail">Email:</label>
                  <input onChange={this.handleEmailChange} className="form-control" type="email" name="userEmail" id="userEmail"/>
                </div>

                <div className="form-group">
                  <label htmlFor="userPassword">Password:</label>
                  <input className="form-control" type="password" name="userPassword" id="userPassword"/>
                </div>

                <button type="submit" className="btn btn-primary">Login</button>
                <div className="mt-3">
                  <a className="float-left" href="">Forgot password?</a>
                  <a className="float-right" href="">Create an account.</a>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default NormalLoginForm;