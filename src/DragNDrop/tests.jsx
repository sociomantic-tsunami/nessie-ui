/* eslint-env node, mocha */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */
/* global expect */

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
        it( 'should contain exactly one DragNDrop', () =>
        {
            expect( wrapper ).to.have.length( 1 );
        } );
    } );

    describe( 'wrapperDriver', () =>
    {
        it( 'should find content', () =>
        {
            const driver = wrapper.driver();
            wrapper.setProps( {
                children : <Text>something</Text>
            } );

            expect( driver.getContent( 'Text' ) ).to.have.length( 1 );
        } );
    } );
} );
