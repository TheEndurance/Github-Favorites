import React, { Component } from 'react';
import { withApollo, compose, graphql } from 'react-apollo';
import RepoList from './RepoList';
import FavoriteList from './FavoriteList';
import Search from './SearchForm';
import {
    VIEW_STARRED_REPOS_QUERY,
    SEARCH_REPOS_QUERY,
    STAR_REPO_MUTATION,
    UNSTAR_REPO_MUTATION,
} from './GraphQLQueries';


class FavoritesDashboard extends Component {
    constructor() {
        super();
        this.state = {
            repos: [],
        };
        this.onSubmitSearch = this.onSubmitSearch.bind(this);
        this.doStarRepo = this.doStarRepo.bind(this);
        this.doUnstarRepo = this.doUnstarRepo.bind(this);
    }

    doStarRepo(repoId) {
        this.props.favoriteRepoMutation({
            variables: {
                repoId: repoId
            },
            refetchQueries: [{ query: VIEW_STARRED_REPOS_QUERY }]
        });
    }

    doUnstarRepo(repoId){
        this.props.unfavoriteRepoMutation({
            variables: {
                repoId: repoId
            },
            refetchQueries: [{ query: VIEW_STARRED_REPOS_QUERY }]
        });
    }
   
    onSubmitSearch(result) {
        this.setState({
            repos: [...result.data.search.nodes]
        });
    }

    onSearchChange() {

    }

    render() {
        return (
            <div>
                <header>
                    <h1>My Github Favorites</h1>
                </header>
                <div>
                    <Search
                        onSearchChange={this.onSearchChange}
                        onSubmitSearch={this.onSubmitSearch}
                        graphQLQuery={SEARCH_REPOS_QUERY} />
                    <RepoList
                        repos={this.state.repos}
                        onAdd={this.doStarRepo} />
                </div>
                <div>
                    <FavoriteList onRemove={this.doUnstarRepo} />
                </div>
            </div>
        )
    }
}

export default compose(
    withApollo,
    graphql(UNSTAR_REPO_MUTATION, { name: "unfavoriteRepoMutation" }),
    graphql(STAR_REPO_MUTATION, { name: "favoriteRepoMutation" }),
)(FavoritesDashboard)