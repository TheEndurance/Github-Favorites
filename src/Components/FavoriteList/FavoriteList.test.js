import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MockedProvider } from 'react-apollo/test-utils';
import FavoriteList from './FavoriteList';

Enzyme.configure({ adapter: new Adapter() });

const mocks = [
    {
        request: {
            query: '',
        },
        result: {},
    },
]


describe('<FavoriteList />', () => {
    describe('Snapshotting', () => {
        it('matches previous snapshot', () => {
            const search = render(
                <MockedProvider mocks={mocks} addTypename={false}>
                    <FavoriteList />
                </MockedProvider>);
            expect(search).toMatchSnapshot();
        })
    });
});