import gql from 'graphql-tag';

const SEARCH_REPOS_QUERY = gql`query($searchValue: String!)
{
    search(type: REPOSITORY, query: $searchValue, first: 10) {
        nodes {
            ... on Repository {
                id
                nameWithOwner
                languages(first: 1, orderBy: {field: SIZE, direction: DESC})
                {
                    nodes {
                      name
                    }
                }
                releases(first: 1, orderBy: {field: CREATED_AT, direction: DESC})
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

const VIEW_STARRED_REPOS_QUERY = gql`query 
{
    user(login:"TheEndurance"){
        starredRepositories(first: 20, ownedByViewer:false, orderBy:{field: STARRED_AT, direction: DESC}){
            nodes{
                ... on Repository {
                    id
                    nameWithOwner
                    languages(first: 1, orderBy: {field: SIZE, direction: DESC})
                    {
                        nodes {
                            name
                        }
                    }
                    releases(first: 1, orderBy: {field: CREATED_AT, direction: DESC})
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
    }
}`

const STAR_REPO_MUTATION = gql`mutation($repoId: ID!)
{
    addStar(input: {starrableId: $repoId}){
        starrable{
            viewerHasStarred
        }
    }
}`

const UNSTAR_REPO_MUTATION = gql`mutation($repoId: ID!)
{
    removeStar(input:{starrableId:$repoId}){
        starrable{
            viewerHasStarred
        }
    }
}`

export { SEARCH_REPOS_QUERY, STAR_REPO_MUTATION, VIEW_STARRED_REPOS_QUERY, UNSTAR_REPO_MUTATION }