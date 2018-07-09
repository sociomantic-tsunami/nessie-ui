/* eslint-env node, mocha */
/* global document Event expect */
/* eslint-disable no-magic-numbers */


import React                from 'react';
import { shallow }          from 'enzyme';

import { InputField, Text } from '../index';

import DimensionsInput      from './index';


describe( 'DimensionsInput', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper  = shallow( <DimensionsInput /> );
        instance = wrapper.instance();
    } );

    describe( 'render()', () =>
    {
        it( 'should contain exactly two InputFields', () =>
        {
            expect( wrapper.find( InputField ) ).to.have.length( 2 );
        } );

        it( 'should contain exactly one Text', () =>
        {
            expect( wrapper.find( Text ) ).to.have.length( 1 );
        } );
    } );
} );
