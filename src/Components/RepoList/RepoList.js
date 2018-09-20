import React from 'react';
import Styles from './RepoList.css';


const RepoList = (props) => {
    const { repos, onAdd } = props;
    const displayRepoList = () => {
        return repos.map((repo, index) => {
            return (
                <tr className='row' key={index}>
                    <td className='col-md-4 col-sm-4'>{repo.nameWithOwner}</td>
                    <td className='col-md-3 col-sm-3'>{repo.languages.nodes.length > 0 ? repo.languages.nodes[0].name : '-'}</td>
                    <td className='col-md-3 col-sm-3'>{repo.releases.nodes.length > 0 ? repo.releases.nodes[0].tag.name : '-'}</td>
                    <td className='col-md-2 col-sm-2'>
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
        <table className='col-md-12 col-sm-12'>
            <thead>
                <tr className='row'>
                    <th className='col-md-4 col-sm-4'>Name</th>
                    <th className='col-md-3 col-sm-3'>Language</th>
                    <th className='col-md-3 col-sm-3'>Latest Tag</th>
                    <th className='col-md-2 col-sm-2'></th>
                </tr>
            </thead>
            <tbody>
                {displayRepoList()}
            </tbody>
        </table>
    )
}

export default RepoList;