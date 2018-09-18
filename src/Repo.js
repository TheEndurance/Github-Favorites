import React from 'react';
import { REPO_ACTION_TYPES } from './constants';

const Repo = (props) => {
    const { repo, onRepoAction } = props;
    const handleRepoAction = (e) => {
        e.preventDefault();
        onRepoAction(e.target.dataset.actionType,e.target.dataset.repoId);
    }
    const displayActions = () => {
        const actions = props.repoActionTypes.map((repoActionTypeEnum) => {
            for (let repoActionTypeKey in REPO_ACTION_TYPES) {
                if (REPO_ACTION_TYPES[repoActionTypeKey] === repoActionTypeEnum) {
                    return <button data-repo-id={repo.id} data-action-type={repoActionTypeEnum} onClick={handleRepoAction}>{repoActionTypeKey}</button>
                }
            }
        });
        return actions;
    }
    return (
        <tr>
            <td>{repo.nameWithOwner}</td>
            <td>{repo.languages.nodes.length? repo.languages.nodes[0].name : ''}</td>
            <td>{repo.releases.nodes.length > 0 ? repo.releases.nodes[0].tag.name : '-'}</td>
            <td>{displayActions()}</td>
        </tr>
    )
}

export default Repo;