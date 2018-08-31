/* global test */
/* eslint-disable no-magic-numbers */

import React           from 'react';
import { shallow }     from 'enzyme';

import StatusIndicator from './index';


describe( 'StatusIndicator', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = shallow( <StatusIndicator /> );
    } );

    test( 'should contain the label text', () =>
    {
        wrapper.setProps( { label: 'hallo' } );
        expect( wrapper.text() ).toBe( 'hallo' );
    } );
} );
