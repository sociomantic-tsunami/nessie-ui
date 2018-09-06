/* global test */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React     from 'react';
import { mount } from 'enzyme';

import Dropdown  from './index';


describe( 'DropdownDriver', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <Dropdown /> );
    } );

    describe( 'Wrapper driver getContent', () =>
    {
        test( 'should return the dropdown content', () =>
        {
            wrapper = mount( <Dropdown><p>Lightning Strike</p></Dropdown> );

            const content = wrapper.driver().getContent();
            expect( content.find( 'p' ).text() ).toBe( 'Lightning Strike' );
        } );
    } );
} );
