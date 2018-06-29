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

    beforeEach( () =>
    {
        wrapper  = shallow( <DimensionsInput /> );
    } );

    describe( 'render()', () =>
    {
        test( 'should contain exactly two InputFields', () =>
        {
            expect( wrapper.find( InputField ) ).toHaveLength( 2 );
        } );

        it( 'should contain exactly one Text', () =>
        {
            expect( wrapper.find( Text ) ).toHaveLength( 1 );
        } );
    } );
} );
