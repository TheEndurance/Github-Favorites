import React from 'react';


const RepoList = (props) => {
    const { repos, onAdd } = props;
    const displayRepoList = () => {
        return repos.map((repo, index) => {
            return (
                <tr key={index}>
                    <td>{repo.nameWithOwner}</td>
                    <td>{repo.languages.nodes.length > 0 ? repo.languages.nodes[0].name : '-'}</td>
                    <td>{repo.releases.nodes.length > 0 ? repo.releases.nodes[0].tag.name : '-'}</td>
                    <td>
                        <button data-repo-id={repo.id} onClick={handleAdd}>Add</button>
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
                <tr>
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

export default RepoList;