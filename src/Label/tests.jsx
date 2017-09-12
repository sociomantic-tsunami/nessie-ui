/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers*/

import React                      from 'react';
import { mount }                  from 'enzyme';

import Label                      from './index';

describe( 'Label', () =>
{
    let Wrapper;
    const props = {
        label : 'Boom'
    };
    beforeEach( () =>
{
        Wrapper = mount( <Label { ...props } /> );
    } );

    it( 'should conatain a single label element', () =>
{
        expect( Wrapper.find( 'label' ) ).to.have.length( 1 );
    } );

    it( 'should have its component name and hash as default className', () =>
{
        expect( Wrapper.find( '.label__default' ) ).to.have.length( 1 );
    } );
} );
