import React from 'react';
import { REPO_ACTION_TYPES } from './constants';

export default function Repo(props) {
    const { repo } = props;
    const displayActions = () => {
        const actions = props.repoActionTypes.map((repoActionTypeEnum) => {
            for (let repoActionTypeKey in REPO_ACTION_TYPES) {
                if (REPO_ACTION_TYPES[repoActionTypeKey] === repoActionTypeEnum) {
                    return <td><button>{repoActionTypeKey}</button></td>
                }
            }
        });
        return actions;
    }
    return (
        <tr>
            <td>{repo.nameWithOwner}</td>
            <td>{repo.languages.nodes[0].name}</td>
            <td>{repo.releases.nodes.length > 0 ? repo.releases.nodes[0].tag.name : '-'}</td>
            {displayActions()}
        </tr>
    )
}