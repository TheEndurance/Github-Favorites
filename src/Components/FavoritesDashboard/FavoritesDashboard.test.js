import React from 'react';
import Enzyme, { mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MockedProvider } from 'react-apollo/test-utils';
import FavoritesDashboard from './FavoritesDashboard';
import { VIEW_STARRED_REPOS_QUERY } from '../../GraphQLQueries';

Enzyme.configure({ adapter: new Adapter() });

const mocks = [
    {
        request: {
            query: VIEW_STARRED_REPOS_QUERY,
        },
        result: {},
    },
]


describe('<FavoritesDashboard />', () => {
    let favoriteDashboard;
    beforeEach(() => {
        favoriteDashboard = mount(
            <MockedProvider mocks={mocks} addTypename={false}>
                <FavoritesDashboard />
            </MockedProvider>
        );
    })
    it('contains a header with the text \'My Github Favorites\'', () => {
        expect(favoriteDashboard.contains(
            <header>
                <h1>My Github Favorites</h1>
            </header>
        )).toBe(true);
    });
    it('contains a single Search component', () => {
        expect(favoriteDashboard.find('Search')).toHaveLength(1);
    });
    it('contains a single RepoList component', () => {
        expect(favoriteDashboard.find('RepoList')).toHaveLength(1);
    });
    it('contains a single FavoriteList component', () => {
        expect(favoriteDashboard.find('FavoriteList')).toHaveLength(1);
    });
    describe('Snapshotting', () => {
        it('matches previous snapshot', () => {
            const favDashboard = render(
                <MockedProvider mocks={mocks} addTypename={false}>
                    <FavoritesDashboard />
                </MockedProvider>);
            expect(favDashboard).toMatchSnapshot();
        })
    });
});