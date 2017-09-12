/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers */


// Uncomment the following lines to use the react test utilities
import React                      from 'react';
import { mount }                  from 'enzyme';

import Switch                     from './index';

describe( 'Switch', () =>
{
    let Wrapper;

    beforeEach( () =>
    {
        Wrapper = null;
    } );

    it( 'should have .switch__default as default className', () =>
    {
        Wrapper = mount( <Switch /> );
        expect( Wrapper.find( '.switch__default' ) ).to.have.length( 1 );
    } );

    it( 'should contain an Switch component', () =>
    {
        Wrapper = mount( <Switch /> );
        expect( Wrapper.find( Switch ) ).to.have.length( 1 );
    } );

    it( 'if isDisabled is checked, component should have .disabled className',
    () =>
    {
        const props = {
            isDisabled : true
        };
        Wrapper = mount( <Switch { ...props } /> );
        expect( Wrapper.find( '.switch__disabled' ) ).to.have.length( 1 );
    } );

    // it('if forceHover is checked, component should have .fakeHovered className', () =>
    // {
    //     let props = {
    //         forceHover : true
    //     }
    //     Wrapper = mount(<Switch { ...props }/>);
    //     expect( Wrapper.find('.switch__fakeHovered') ).to.have.length(1);
    // });
} );
