import React, { Component } from 'react';
import User from './components/User';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
// import uuid from 'uuid';

class App extends Component {
	state = {
		base: 'https://api.github.com/users/',
		value: '',
		user: {},
		error: false,
		searched:false
	};

	handleChange = e => {
		let searchValue = e.target.value.trim();
		this.setState({
			searched:false,
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
					`https://api.github.com/users/${search}`
				)
				.then(response => {
					console.log(response);
					let userData = response.data;

					this.setState(prevState => ({
						searched:true,
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
								<div className="alert alert-danger text-center text-capitalize">
									Value Empty
								</div>
							)}
							{this.state.searched && (
								<User 
								search={this.state.value} 
								userData={this.state.user}
								
								/>
							)}
							
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default App;
