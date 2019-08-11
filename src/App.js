import React, { Component } from 'react';
import User from './components/User';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
// import uuid from 'uuid';

class App extends Component {
	state = {
		client_id: '#',
		client_secret: '#',
		base: 'https://api.github.com/users/',
		value: '',
		user: {},
		error: false
	};

	handleChange = e => {
		let searchValue = e.target.value.trim();
		this.setState({
			value: searchValue
		});
	};

	handleFetchUser = e => {
		e.preventDefault();

		let search = this.state.value.toLowerCase();

		if (search === '') {
			this.setState(prevState => ({
				error: !prevState.error
			}));
		} else {
			axios
				.get(
					`https://api.github.com/users/${search}?client_id='${
						this.state.client_id
					}'&client_secret='${this.state.client_secret}'`
				)
				.then(response => {
					// console.log(response);
					let userData = response.data;

					this.setState(prevState => ({
						user: { ...prevState.user, ...userData }
					}));
				});
		}
	};

	render() {
		return (
			<React.Fragment>
				<div className="container">
					<div className="row">
						<div className="col mt-4">
							<img
								src="https://raw.githubusercontent.com/john-smilga/js-githubAPI-setup/master/img/github-logo.png"
								className="d-block mx-auto"
								width="300"
								alt=""
							/>
							<h4 className="text-uppercase text-center mb-4">
								search github user
							</h4>
							<form className="mb-5" onSubmit={this.handleFetchUser}>
								<div className="input-group">
									<input
										value={this.value}
										onChange={this.handleChange}
										type="text"
										className="form-control"
										placeholder="search user"
										aria-label=""
										aria-describedby="basic-addon1"
									/>
									<div className="input-group-append">
										<button
											className="btn btn-info text-capitalize"
											type="submit"
										>
											search github
										</button>
									</div>
								</div>
							</form>
							{this.state.error && (
								<div class="alert alert-danger text-center text-capitalize">
									Value Empty
								</div>
							)}
							<User 
							search={this.state.value} 
							userData={this.state.user}
							cilent_id={this.state.client_id}
							client_secret={this.state.client_secret}
							 />
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default App;
