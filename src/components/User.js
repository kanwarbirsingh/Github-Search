import Repos from './Repos';
import axios from 'axios';
import React, { Component } from 'react';
import './User.css';
export default class User extends Component {
	state = {
		userRepos: []
	};

	handleFetchRepos = e => {
		e.preventDefault();
		axios
			.get(
				`https://api.github.com/users/${this.props.search}/repos?client_id=${
					this.state.client_id
				}&client_secret=${this.state.client_secret}`
			)
			.then(response => {
				console.log(response);
				let userRepos = response.data;

				this.setState(prevState => ({
					userRepos: prevState.userRepos.concat(userRepos)
				}));
			});
	};

	render() {
		const { userData } = this.props;
		const {
			avatar_url: image,
			html_url: link,
			public_repos: repos,
			name
		} = userData;

		return (
			<React.Fragment>
				<div className="row my-3">
					<div className="col-sm-6 col-md-4 my-2">
						<img src={image} className="img-fluid" alt="Responsive image" />
					</div>
					<div className="col-sm-6 col-md-4 my-2 text-capitalize">
						<h6>
							name: <span>{name}</span>
						</h6>
						<h6>
							github:{' '}
							<a
								href={link}
								className="badge badge-primary"
								target="_blank"
								rel="noopener noreferrer"
							>
								link
							</a>
						</h6>
						<h6>
							public repos: <span className="badge badge-success">{repos}</span>
						</h6>
					</div>
					<div className="col-sm-6 col-md-4 my-2 text-capitalize user-repos ">
						<button
							type="button"
							className="btn btn-outline-info mt-3 text-capitalize"
							onClick={this.handleFetchRepos}
						>
							get repos
						</button>
						<Repos userRepos={this.state.userRepos} />
					</div>
				</div>
			</React.Fragment>
		);
	}
}
