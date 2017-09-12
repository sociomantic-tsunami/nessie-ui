/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers */


// Uncomment the following lines to use the react test utilities
import React                      from 'react';
// const TestUtils = React.addons.TestUtils;
import { mount }                  from 'enzyme';


import Text                       from './index';

describe( 'Text', () =>
{
    let Wrapper;

    beforeEach( () =>
    {
        Wrapper = mount( <Text /> );
    } );

    it( 'should have its component name and hash as default className', () =>
    {
        expect( Wrapper.find( '.text__default' ) ).to.have.length( 1 );
    } );
} );
