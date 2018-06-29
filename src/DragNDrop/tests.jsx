/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */
/* global test */

import React            from 'react';
import { mount }        from 'enzyme';

import { Text }         from '../index';

import DragNDrop        from './index';

describe( 'DragNDrop', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <DragNDrop /> );
    } );

    describe( 'render()', () =>
    {
        test( 'should contain exactly one DragNDrop', () =>
        {
            expect( wrapper ).toHaveLength( 1 );
        } );
    } );

    describe( 'wrapperDriver', () =>
    {
        test( 'should find content', () =>
        {
            const driver = wrapper.driver();
            wrapper.setProps( {
                children : <Text>something</Text>
            } );

            expect( driver.getContent() ).toHaveLength( 1 );
        } );
    } );
} );
