/* global test */

import React       from 'react';
import { shallow } from 'enzyme';

import Icon        from './index';


describe( 'Icon', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = shallow( <Icon /> );
    } );

    test( 'should be a stateless functional component', () =>
    {
        expect( wrapper.instance() ).toBe( null );
    } );

    test( 'should have size S by default', () =>
    {
        expect( Icon.defaultProps.size ).toBe( 'S' );
    } );
} );
