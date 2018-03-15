/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str*/

import React              from 'react';
import { shallow }        from 'enzyme';

import { Tab, TabButton } from '../index';

import Tabs               from './index';


describe( 'Tabs', () =>
{
    let wrapper;
    // let instance;

    beforeEach( () =>
    {
        wrapper  = shallow( <Tabs /> );
        // instance = wrapper.instance();
    } );

    describe( 'render()', () =>
    {
        it( 'should accept a single Tab as children', () =>
        {
            wrapper.setProps( { children: <Tab /> } );
            expect( wrapper.find( TabButton ) ).to.have.length( 1 );
        } );

        it( 'should accept an array of Tabs as children', () =>
        {
            wrapper.setProps( { children: [ <Tab />, <Tab /> ] } );
            expect( wrapper.find( TabButton ) ).to.have.length( 2 );
        } );
    } );
} );
