/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str*/

import React          from 'react';
import { shallow }    from 'enzyme';

import ListBox        from './index';


describe( 'ListBox', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper  = shallow( <ListBox /> );
    } );

    describe( 'render()', () =>
    {
        it( 'should accept a single Tab as children', () =>
        {
            wrapper.setProps( { children: <ListBox /> } );
            expect( wrapper.find( ListBox ) ).to.have.length( 1 );
        } );

        it( 'should accept an array of Tabs as children', () =>
        {
            wrapper.setProps( { children: [ <ListBox />, <ListBox /> ] } );
            expect( wrapper.find( ListBox ) ).to.have.length( 2 );
        } );
    } );
} );
