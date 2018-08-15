/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React      from 'react';
import { mount }  from 'enzyme';

import { Column } from '../index';

import Grid       from './index';


describe( 'GridColumnDriver', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <Grid /> );
    } );

    describe( 'getContent', () =>
    {
        test( 'should return the content of the Grid or Column', () =>
        {
            wrapper.setProps( { children: <Column>Lightning Strike</Column> } );

            const content = wrapper.driver().getContent();
            expect( content.text() ).toBe( 'Lightning Strike' );
        } );
    } );
} );
