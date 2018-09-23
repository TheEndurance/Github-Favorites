import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import PropTypes from 'prop-types';

import Styles from './SearchForm.css';
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
                <input className={Styles.search} type='text'
                    value={this.state.searchValue}
                    onChange={this.handleSearchChange}

                />
                <button id='search-button' className={Styles.primaryPurpleButton} onClick={this.executeSearch}>Search</button>
            </form>
        )
    }
}

Search.propTypes = {
    onSearchChange : PropTypes.func.isRequired,
    onSubmitSearch : PropTypes.func.isRequired
}

export default withApollo(Search)
