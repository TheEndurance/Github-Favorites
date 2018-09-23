import React from 'react';
import {
    graphql,
} from 'react-apollo';
import PropTypes from 'prop-types';
import Styles from './FavoriteList.css';

import { VIEW_STARRED_REPOS_QUERY } from '../../GraphQLQueries';


const FavoriteList = (props) => {
    const { data: { loading, error, user }, onRemove } = props;
    const displayFavoriteList = () => {
        if (!loading && !error && user) {
            return user.starredRepositories.nodes.map((repo, index) => {
                return (
                    <tr className='table-four-column-grid' key={index}>
                        <td>{repo.nameWithOwner}</td>
                        <td>{repo.languages.nodes.length > 0 ? repo.languages.nodes[0].name : '-'}</td>
                        <td>{repo.releases.nodes.length > 0 ? repo.releases.nodes[0].tag.name : '-'}</td>
                        <td>
                            <button className={Styles.link} data-repo-id={repo.id} onClick={handleRemove}>Remove</button>
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
                <tr className='table-four-column-grid'>
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

const favoriteListPropType = PropTypes.shape({
    starredRepositories: PropTypes.shape({
        nodes: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            nameWithOwner: PropTypes.string.isRequired,
            languages: PropTypes.shape({
                nodes: PropTypes.arrayOf(PropTypes.shape({
                    name: PropTypes.string.isRequired
                })).isRequired
            }).isRequired,
            releases: PropTypes.shape({
                nodes: PropTypes.arrayOf(PropTypes.shape({
                    tag: PropTypes.shape({
                        name: PropTypes.string.isRequired
                    }).isRequired
                })).isRequired
            }).isRequired
        })).isRequired
    }).isRequired
});

FavoriteList.propTypes = {
    data: PropTypes.shape({
        error: PropTypes.string,
        loading: PropTypes.bool.isRequired,
        user: favoriteListPropType
    })
};



export default graphql(VIEW_STARRED_REPOS_QUERY)(FavoriteList);
