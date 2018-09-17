import React, { Component } from 'react';
import RepoList from './RepoList';
import Search from './SearchForm';
import gql from 'graphql-tag';
import { REPO_ACTION_TYPES } from './constants';


const SEARCH_QUERY = gql`query($searchValue: String!)
{
    search(type: REPOSITORY, query: $searchValue, first: 10) {
        nodes {
            ... on Repository {
                nameWithOwner
                languages(first: 1, orderBy: {field: SIZE, direction: DESC})
                {
                    nodes {
                      name
                    }
                }
                releases(first: 1, orderBy: {field: CREATED_AT, direction: ASC})
                {
                    nodes {
                      tag {
                        name
                      }
                    }
               }
            }
        }
    }
}`

export default class FavoritesDashboard extends Component {
    constructor() {
        super();
        this.state = {
            repos: [],
            favoritedRepos: []
        }
        this.onSubmitSearch = this.onSubmitSearch.bind(this);
    }

    onRepoAction(actionType, repoId) {
        switch (actionType) {
            case REPO_ACTION_TYPES.Add === actionType:
                break;
            case REPO_ACTION_TYPES.Remove === actionType:
                break;
            default:
                break;
        }
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
                        graphQLQuery={SEARCH_QUERY} />
                    <RepoList
                        repos={this.state.repos}
                        onRepoAction={this.onRepoAction}
                        repoActionTypes={[REPO_ACTION_TYPES.Add]} />
                </div>
                <hr></hr>
                <div>
                    <RepoList
                        repos={this.state.favoritedRepos}
                        onRepoAction={this.onRepoAction}
                        repoActionTypes={[REPO_ACTION_TYPES.Remove]} />
                </div>
            </div>
        )
    }
}

