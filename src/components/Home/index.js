import React, { Component } from 'react';
import './style.scss';
import axios from 'axios';
import Gallery from './Gallery';

const API_URL = 'https://pixabay.com/api?key=243711-745acfcb31572fcc53780632b';

class Home extends Component {

    state = {
        images: [],
        currentPage: 1,
        isLoading: false
    };

    componentDidMount() {
        window.addEventListener('scroll', async _ => {
            const { innerHeight, scrollY } = window;
            const docHeight = window.document.documentElement.scrollHeight;
            if (docHeight < scrollY + innerHeight + 100) {
                await this.fetchImages();
            }
        });
    }

    handleStartClick = async e => {
        await this.fetchImages();
    }

    async fetchImages() {
        const { isLoading, currentPage } = this.state;
        if (!isLoading) {
            this.setState(_ => ({ isLoading: true }));
                try {
                const { data, errors } = await axios.get(`${API_URL}&page=${currentPage}`);
                if (errors) {
                    throw new Error(errors[0].message);
                } else if (data) {
                    const { hits } = data;
                    this.setState(state => ({
                        images: [ ...state.images, ...hits ],
                        isLoading: false,
                        currentPage: state.currentPage + 1
                    }));
                }
            } catch(e) {
                console.error(e);
                this.setState(_ => ({ isLoading: false }));
            }
        }
    }

	render() {
        const { images } = this.state;
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
                                <button
                                    onClick={this.handleStartClick}
                                    className="btn btn-primary btn-lg">
                                    Start
                                </button>
                            </p>
                        </div>
                    </div>
                    <div>
                        {
                            images.length > 0 ?
                            (<Gallery
                                isLoading={this.state.isLoading}
                                images={this.state.images}
                            />)
                            :
                            ''
                        }
                    </div>
                </main>
            </div>
		);
	}
}

export default Home;