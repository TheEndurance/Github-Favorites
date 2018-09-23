import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MockedProvider } from 'react-apollo/test-utils';
import SearchForm from './SearchForm';

Enzyme.configure({ adapter: new Adapter() });

const mocks = [
    {
        request: {
            query: '',
        },
        result: {},
    },
]


describe('<Search />', () => {
    describe('Snapshotting', () => {
        it('matches previous snapshot', () => {
            const search = render(
                <MockedProvider mocks={mocks} addTypename={false}>
                    <SearchForm />
                </MockedProvider>);
            expect(search).toMatchSnapshot();
        })
    });
});