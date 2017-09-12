/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/


import React                      from 'react';
import { shallow, render, mount } from 'enzyme';

import ScrollBox                  from './index';

describe( 'ScrollBox', () =>
{
    let Wrapper;

    beforeEach( () =>
    {
        Wrapper = null;
    } );

    it( 'should conatain a single ScrollBox', () =>
    {
        const props = {
            title : 'Boom'
        };
        Wrapper = mount( <ScrollBox { ...props } /> );

        expect( Wrapper.find( ScrollBox ) ).to.have.length( 1 );
        expect( Wrapper.find( ScrollBox ) ).to.not.have.length( 2 );
    } );

    it( 'should have its component name and hash as default className', () =>
    {
        const props = {
            title : 'Boom'
        };

        Wrapper = mount( <ScrollBox { ...props } /> );
        expect( Wrapper.find( '.scrollBox__default' ) ).to.have.length( 1 );
    } );
} );
