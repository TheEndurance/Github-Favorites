import React from 'react';
import {
    graphql,
} from 'react-apollo';

import { VIEW_STARRED_REPOS_QUERY } from '../../GraphQLQueries';

const FavoriteList = (props) => {
    const { data: { loading, error, user }, onRemove } = props;

    const displayFavoriteList = () => {
        if (!loading && !error && user) {
            return user.starredRepositories.nodes.map((repo, index) => {
                return (
                    <tr key={index}>
                        <td>{repo.nameWithOwner}</td>
                        <td>{repo.languages.nodes.length > 0 ? repo.languages.nodes[0].name : '-'}</td>
                        <td>{repo.releases.nodes.length > 0 ? repo.releases.nodes[0].tag.name : '-'}</td>
                        <td>
                            <button data-repo-id={repo.id} onClick={handleRemove}>Remove</button>
                        </td>
                    </tr>
                )
            })
        }
    }

    const handleRemove = (e) => {
        e.preventDefault();
        onRemove(e.target.dataset.repoId);
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Language</th>
                    <th>Latest Tag</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {displayFavoriteList()}
            </tbody>
        </table>
    );
};



export default graphql(VIEW_STARRED_REPOS_QUERY)(FavoriteList);