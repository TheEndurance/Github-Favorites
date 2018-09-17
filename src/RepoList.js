import React, { Component } from 'react';
import Repo from './Repo'


class RepoList extends Component {
    render() {
        let { repos } = this.props;
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
                    {repos.map((repo, index) => (
                        <Repo key={index} repo={repo} repoActionTypes={this.props.repoActionTypes} />
                    ))}
                </tbody>
            </table>
        )
    }
}

export default RepoList
