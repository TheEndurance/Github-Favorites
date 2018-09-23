import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MockedProvider } from 'react-apollo/test-utils';
import RepoList from './RepoList';

Enzyme.configure({ adapter: new Adapter() });

const mocks = [
    {
        request: {
            query: '',
        },
        result: {},
    },
]


describe('<RepoList />', () => {
    describe('Snapshotting', () => {
        it('matches previous snapshot', () => {
            const search = render(
                <MockedProvider mocks={mocks} addTypename={false}>
                    <RepoList />
                </MockedProvider>);
            expect(search).toMatchSnapshot();
        })
    });
});