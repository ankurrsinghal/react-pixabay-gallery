import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { logout, authenticate, register } from '../../actions';
import './style.scss';
import Login from '../Login';
import Register from '../Register';
import Home from '../Home';

class App extends Component {

	handleLogoutClick = () => {
        this.props.logout();
	}
	
	handleLoginSubmit = ({ email, password }) => {
        this.props.authenticate(email, password);
	}

	handleRegisterSubmit = data => {
		this.props.register(data);
	}

	render() {
		const { user, status, message } = this.props;
		const isLoggedIn = !!user;

		return (
			<Router>
				<div className="Paysense-App">
					<Route
						path="/"
						exact
						render={props => {
							if (isLoggedIn) {
								return (
									<Home
										{...props}
										user={this.props.user}
										onLogout={this.handleLogoutClick}/>
								);
							} else {
								return <Redirect to="/login" />
							}
						}}
					/>
					<Route
						path="/login"
						render={props => {
							if (isLoggedIn) {
								return <Redirect to="/" />;
							} else {
								return (
									<Login
										{...props}
										status={status}
										message={message}
										onSubmit={this.handleLoginSubmit}
									/>
								);
							}
						}}
					/>
					<Route
						path="/register"
						render={props => {
							if (isLoggedIn) {
								return <Redirect to="/" />;
							} else {
								return (
									<Register
										{...props}
										status={status}
										message={message}
										onSubmit={this.handleRegisterSubmit}
									/>
								);
							}
						}}
					/>
				</div>
			</Router>
		);
	}
}


const mapStateToProps = state => {
    return state.auth
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => {
            dispatch(logout())
		},
		
		authenticate: (email, password) => {
            dispatch(authenticate(email, password))
		},

		register: data => {
            dispatch(register(data))
		}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);