import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext} from 'apollo-link-context';

const httpLink = createHttpLink({
    uri: 'https://api.github.com/graphql'
})

const authLink = setContext((request, { previousContext }) => {
    return {
        headers: {
            authorization: 'token 8bca68f625ddff4a9ce45e83fed22aa09346620e'
        },
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
    , document.getElementById('root')
);
registerServiceWorker();
