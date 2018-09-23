import React from 'react';
import Styles from './RepoList.css';
import PropTypes from 'prop-types';


const RepoList = (props) => {
    const { repos, onAdd } = props;
    const displayRepoList = () => {
        if (!repos) return;
        return repos.map((repo, index) => {
            return (
                <tr className='table-four-column-grid' key={index}>
                    <td>{repo.nameWithOwner}</td>
                    <td>{repo.languages.nodes.length > 0 ? repo.languages.nodes[0].name : '-'}</td>
                    <td>{repo.releases.nodes.length > 0 ? repo.releases.nodes[0].tag.name : '-'}</td>
                    <td>
                        <button className={Styles.link} data-repo-id={repo.id} onClick={handleAdd}>Add</button>
                    </td>
                </tr>
            )
        });
    }

    const handleAdd = (e) => {
        e.preventDefault();
        onAdd(e.target.dataset.repoId)
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
                {displayRepoList()}
            </tbody>
        </table>
    )
}

RepoList.propTypes = {
    repos: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        nameWithOwner: PropTypes.string.isRequired,
        languages: PropTypes.shape({
            nodes: PropTypes.arrayOf(PropTypes.shape({
                name: PropTypes.string
            }))
        }).isRequired,
        releases: PropTypes.shape({
            nodes: PropTypes.arrayOf(PropTypes.shape({
                tag: PropTypes.shape({
                    name: PropTypes.string
                })
            }))
        }).isRequired
    }))
};

export default RepoList;

