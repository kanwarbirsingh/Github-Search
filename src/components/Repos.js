import React from 'react';

const Repos = ({ userRepos }) => {
	return userRepos.map((repo, i) => (
		<p key={i}>
			<a href={repo.html_url} target="_blank" rel="noopener noreferrer">
				{repo.name}
			</a>
		</p>
	));
};
export default Repos;
