import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const Alert = ({ children }) => (
    <div
        className="alert alert-danger"
        role="alert">
        {children}
    </div>
)

class Register extends Component {

    handleSubmit = e => {
        e.preventDefault();
        const data = new FormData(e.target);

        const email = data.get('email');
        const password = data.get('password');
        const confirmPassword = data.get('confirmPassword');
        const firstName = data.get('firstName');
        const lastName = data.get('lastName');

        this.props.onSubmit({ email, password, confirmPassword, firstName, lastName });
    }

	render() {
        const { status, message } = this.props;
        const isLoading = status === 'requesting';
        
        const loadingButton = (
            <button className="btn btn-primary btn-block" type="button" disabled>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span className="sr-only">Loading...</span>
            </button>
        );
        const submitButton = (
            <Fragment>
                <button
                    className="btn btn-primary btn-block"
                    type="submit">
                    Register
                </button>
                <Link
                    className="btn btn-warning btn-block"
                    to="/login">
                    Login
                </Link>
            </Fragment>
        );

		return (
            <form
                onSubmit={this.handleSubmit}
                className="form-register text-center">
                <h1 className="h1 mb-3 font-weight-normal">
                    Welcome to Paysense
                </h1>
                <h1 className="h3 mb-3 font-weight-normal">
                    Please sign in
                </h1>
                { message ? <Alert>{message}</Alert> : null }
                <div className="form-group">
                    <label htmlFor="inputEmail" className="sr-only">
                        Email address
                    </label>
                    <input
                        name="email"
                        type="email"
                        id="inputEmail"
                        className="form-control"
                        placeholder="Email address"
                        required
                        autoFocus
                    />
                </div>
                <div className="form-group">
                    <label
                        htmlFor="inputPassword"
                        className="sr-only">
                        Password
                    </label>
                    <input
                        name="password"
                        type="password"
                        id="inputPassword"
                        className="form-control"
                        placeholder="Password"
                        required
                    />
                </div>
                <div className="form-group">
                    <label
                        htmlFor="inputPasswordConfirmation"
                        className="sr-only">
                        Confirm Password
                    </label>
                    <input
                        name="confirmPassword"
                        type="password"
                        id="inputPasswordConfirmation"
                        className="form-control"
                        placeholder="Confirm Password"
                        required
                    />
                </div>
                <div className="form-group">
                    <label
                        htmlFor="inputFirstName"
                        className="sr-only">
                        First Name
                    </label>
                    <input
                        name="firstName"
                        type="text"
                        id="inputFirstName"
                        className="form-control"
                        placeholder="First Name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label
                        htmlFor="inputLastName"
                        className="sr-only">
                        Last Name
                    </label>
                    <input
                        name="lastName"
                        type="text"
                        id="inputLastName"
                        className="form-control"
                        placeholder="Last Name"
                        required
                    />
                </div>
                {isLoading ? loadingButton : submitButton}
            </form>
		);
	}
}

export default Register;
