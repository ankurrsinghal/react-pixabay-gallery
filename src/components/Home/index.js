import React, { Component } from 'react';
import './style.scss';

class Home extends Component {
	render() {
        const { user } = this.props;
        const { firstName, lastName } = user;
        const name = firstName + ' ' + lastName;

		return (
            <div className="Paysense-Home">
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <a
                        className="navbar-brand"
                        href="/">
                        Paysense
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarsExampleDefault"
                        aria-controls="navbarsExampleDefault"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarsExampleDefault">
                        <ul
                            style={{ marginLeft: 'auto' }}
                            className="navbar-nav">
                            <li className="nav-item">
                                <span
                                    style={{ cursor: 'pointer' }}
                                    onClick={this.props.onLogout}
                                    className="nav-link active">
                                    Logout
                                </span>
                            </li>
                        </ul>
                    </div>
                </nav>
                <main role="main">
                    <div className="jumbotron">
                        <div className="container">
                            <h1 className="display-3">
                                Hello, {name}
                            </h1>
                            <p>Let's begin looking at some awesome pictures.</p>
                            <p>
                                <button className="btn btn-primary btn-lg">
                                    Start
                                </button>
                            </p>
                        </div>
                    </div>
                    <div className="container">
                        
                    </div>
                </main>
            </div>
		);
	}
}

export default Home;