import React, { Component } from 'react';
import { withApollo } from 'react-apollo';


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: ''
        }
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.executeSearch = this.executeSearch.bind(this);
    }

    handleSearchChange(e) {
        this.setState({ searchValue: e.target.value });
        this.props.onSearchChange(e.target.value);
    }

    async executeSearch(e) {
        e.preventDefault();
        const { searchValue } = this.state;
        const result = await this.props.client.query({
            query: this.props.graphQLQuery,
            variables: { searchValue }
        });
        this.props.onSubmitSearch(result);
    }
    render() {
        return (
            <form>
                <input type='text'
                    name={this.props.name}
                    id={this.props.id}
                    value={this.state.searchValue}
                    onChange={this.handleSearchChange}

                />
                <button onClick={this.executeSearch}>Search</button>
            </form>
        )
    }
}

export default withApollo(Search)
