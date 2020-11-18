import Repos from './Repos';
import axios from 'axios';
import React, { Component } from 'react';
import './User.css';

export default class User extends Component {
	state = {
		userRepos: [],
		image: require('../avatar.png')
	};

	handleFetchRepos = e => {
		e.preventDefault();
		axios
			.get(
				`https://api.github.com/users/${this.props.search}/repos`
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
						<img src={image? image : this.state.image} className="img-fluid" alt="Responsive" />
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
					<div className="col-sm-6 col-md-4 my-2 text-capitalize ">
						<button
							type="button"
							className="btn btn-outline-info mt-3 text-capitalize"
							onClick={this.handleFetchRepos}
						>
							get repos
						</button>
						<div className="user-repos">
						<Repos userRepos={this.state.userRepos} />
						</div>
						
					</div>
				</div>
			</React.Fragment>
		);
	}
}
