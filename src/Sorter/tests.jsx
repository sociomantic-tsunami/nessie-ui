/* global test jest */

import React     from 'react';
import { mount } from 'enzyme';

import Sorter    from './index';


describe( 'SorterDriver', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <Sorter /> );
    } );

    test( 'should call onToggle callback function', () =>
    {
        const onToggle = jest.fn();
        wrapper.setProps( { onToggle } );

        wrapper.driver().toggle();
        expect( onToggle ).toBeCalled();
    } );
} );
